# config.py
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'super-secret-key')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret')
    WTF_CSRF_ENABLED = True
    SESSION_COOKIE_SECURE = True
    REMEMBER_COOKIE_SECURE = True
    DEBUG = False
