"""Item model."""
from app import db
from app.models.base import BaseModel


class Item(BaseModel):
    """Item model for demonstrating CRUD operations."""

    __tablename__ = 'items'

    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2))
    quantity = db.Column(db.Integer, default=0)
    is_available = db.Column(db.Boolean, default=True, nullable=False)

    # Foreign key to user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        """Convert item to dictionary.

        Returns:
            dict: Item data
        """
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': float(self.price) if self.price else None,
            'quantity': self.quantity,
            'is_available': self.is_available,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        """String representation of Item."""
        return f'<Item {self.name}>'
