"""Application entry point."""
import os
from app import create_app, db
from app.models import User, Item

# Create Flask application
app = create_app(os.getenv('FLASK_ENV', 'development'))


@app.shell_context_processor
def make_shell_context():
    """Make database and models available in Flask shell."""
    return {
        'db': db,
        'User': User,
        'Item': Item
    }


@app.cli.command()
def init_db():
    """Initialize the database."""
    db.create_all()
    print('Database initialized successfully!')


@app.cli.command()
def seed_db():
    """Seed the database with sample data."""
    # Create sample users
    user1 = User(
        username='john_doe',
        email='john@example.com',
        first_name='John',
        last_name='Doe'
    )
    user1.set_password('password123')

    user2 = User(
        username='jane_smith',
        email='jane@example.com',
        first_name='Jane',
        last_name='Smith'
    )
    user2.set_password('password123')

    db.session.add_all([user1, user2])
    db.session.commit()

    # Create sample items
    item1 = Item(
        name='Laptop',
        description='High-performance laptop',
        price=1299.99,
        quantity=5,
        user_id=user1.id
    )

    item2 = Item(
        name='Mouse',
        description='Wireless gaming mouse',
        price=79.99,
        quantity=20,
        user_id=user1.id
    )

    item3 = Item(
        name='Keyboard',
        description='Mechanical keyboard',
        price=149.99,
        quantity=10,
        user_id=user2.id
    )

    db.session.add_all([item1, item2, item3])
    db.session.commit()

    print('Database seeded successfully!')
    print(f'Created {User.query.count()} users and {Item.query.count()} items')


if __name__ == '__main__':
    app.run(
        host=os.getenv('HOST', '0.0.0.0'),
        port=int(os.getenv('PORT', 5000)),
        debug=os.getenv('FLASK_ENV') == 'development'
    )
