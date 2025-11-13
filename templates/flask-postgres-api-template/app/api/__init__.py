"""API blueprint package."""
from flask import Blueprint

# Create API blueprint
api_bp = Blueprint('api', __name__)

# Import routes after blueprint creation to avoid circular imports
from app.api import users, items, auth

__all__ = ['api_bp']
