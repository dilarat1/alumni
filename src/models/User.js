/**
 * User Model
 * In-memory storage without database connection (as requested by instructor).
 * Implements full CRUD operations.
 */
class UserModel {
  constructor() {
    this.users = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@alumni.com',
        password: 'password123',
        phone: '555-0001',
        created_at: new Date('2026-09-30T06:41:38.000Z')
      },
      {
        id: 2,
        username: 'dilara',
        email: 'dilara@alumni.com',
        password: 'password123',
        phone: '555-0002',
        created_at: new Date('2026-09-30T06:41:38.000Z')
      },
      {
        id: 3,
        username: 'emre',
        email: 'emre@alumni.com',
        password: 'password123',
        phone: '555-0003',
        created_at: new Date('2026-09-30T06:54:46.000Z')
      }
    ];
    this.nextId = 4;
  }

  // READ (All)
  getAll() {
    return this.users.map(({ password, ...u }) => u);
  }

  // READ (One by ID)
  getById(id) {
    const user = this.users.find(u => u.id === parseInt(id));
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  }

  // CREATE
  create(userData) {
    const { username, email, password, phone } = userData;
    const newUser = {
      id: this.nextId++,
      username: username || 'user_' + this.nextId,
      email: email || '',
      password: password || '123456',
      phone: phone || '',
      created_at: new Date()
    };
    this.users.push(newUser);
    const { password: _, ...safeUser } = newUser;
    return safeUser;
  }

  // UPDATE (Full - PUT)
  update(id, userData) {
    const index = this.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return null;

    const { username, email, password, phone } = userData;
    this.users[index] = {
      ...this.users[index],
      username: username || this.users[index].username,
      email: email || this.users[index].email,
      password: password || this.users[index].password,
      phone: phone !== undefined ? phone : this.users[index].phone
    };

    const { password: _, ...safeUser } = this.users[index];
    return safeUser;
  }

  // PATCH (Partial update)
  patch(id, partialData) {
    const index = this.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return null;

    const allowed = ['username', 'email', 'password', 'phone'];
    allowed.forEach(field => {
      if (partialData[field] !== undefined) {
        this.users[index][field] = partialData[field];
      }
    });

    const { password: _, ...safeUser } = this.users[index];
    return safeUser;
  }

  // DELETE
  delete(id) {
    const index = this.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

module.exports = new UserModel();
