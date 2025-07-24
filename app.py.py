from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from flask_cors import CORS
import re
import datetime
from collections import defaultdict

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'supersecretkey'  # Change to a strong key in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=1)

CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Mock database
users = {
    'user@example.com': {
        'password': bcrypt.generate_password_hash('Password123!').decode('utf-8'),
        'mfa_enabled': True,
        'locked': False,
        'failed_attempts': 0
    }
}

# Rate limiting config
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_DURATION_MINUTES = 15
lockout_times = defaultdict(lambda: None)

# Password regex for strength
PASSWORD_REGEX = re.compile(
    r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
)

@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    if not PASSWORD_REGEX.match(password):
        return jsonify({'error': 'Password must be at least 8 characters, include uppercase, lowercase, number, and symbol'}), 400

    if email in users:
        return jsonify({'error': 'User already exists'}), 409

    hashed = bcrypt.generate_password_hash(password).decode('utf-8')
    users[email] = {
        'password': hashed,
        'mfa_enabled': True,
        'locked': False,
        'failed_attempts': 0
    }

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = users.get(email)

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Check if account is locked
    lockout_time = lockout_times[email]
    if user['locked']:
        if lockout_time and (datetime.datetime.now() - lockout_time).seconds < LOCKOUT_DURATION_MINUTES * 60:
            return jsonify({'error': 'Account is temporarily locked. Try again later.'}), 403
        else:
            user['locked'] = False
            user['failed_attempts'] = 0
            lockout_times[email] = None

    if bcrypt.check_password_hash(user['password'], password):
        if user.get('mfa_enabled'):
            return jsonify({"mfa_required": True}), 202
        token = create_access_token(identity=email)
        return jsonify({'token': token}), 200
    else:
        user['failed_attempts'] += 1
        if user['failed_attempts'] >= MAX_FAILED_ATTEMPTS:
            user['locked'] = True
            lockout_times[email] = datetime.datetime.now()
            return jsonify({'error': 'Account locked due to multiple failed attempts'}), 403
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/auth/verify-mfa', methods=['POST'])
def verify_mfa():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    user = users.get(email)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if code == '123456':  # Simulated OTP
        token = create_access_token(identity=email)
        return jsonify({'token': token}), 200
    return jsonify({'error': 'Invalid OTP code'}), 403

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Welcome {current_user}!'}), 200

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK'}), 200

if __name__ == '__main__':
    app.run(debug=True)
