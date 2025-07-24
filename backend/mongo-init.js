// MongoDB initialization script
db = db.getSiblingDB('nestjs_app');

// Create a user for the application
db.createUser({
  user: 'nestjs_user',
  pwd: 'nestjs_password',
  roles: [
    {
      role: 'readWrite',
      db: 'nestjs_app'
    }
  ]
});

// Create collections (optional, as Prisma will create them)
// db.createCollection('users');
// db.createCollection('posts');

print('Database initialized successfully'); 