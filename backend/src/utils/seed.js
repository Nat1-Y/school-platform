const { sequelize } = require('../config/database');
const { User } = require('../models/user.model');
const { Teacher } = require('../models/teacher.model');
const { Parent } = require('../models/parent.model');
const { Student } = require('../models/student.model');
const { Class } = require('../models/class.model');
const { Subject } = require('../models/subject.model');
const { Semester } = require('../models/semester.model');

const seedDatabase = async () => {
  try {
    // Create sample classes
    const class1 = await Class.create({ class_name: 'Grade 10A' });
    const class2 = await Class.create({ class_name: 'Grade 10B' });

    // Create sample subjects
    const math = await Subject.create({ subject_name: 'Mathematics' });
    const science = await Subject.create({ subject_name: 'Science' });
    const english = await Subject.create({ subject_name: 'English' });

    // Create current semester
    const currentSemester = await Semester.create({
      semester_name: 'Spring 2025',
      start_date: '2025-01-10',
      end_date: '2025-05-30',
      is_active: true
    });

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@school.edu',
      password_hash: 'admin123',
      role: 'admin'
    });

    // Create teacher users
    const teacher1 = await User.create({
      username: 'teacher1',
      email: 'teacher1@school.edu',
      password_hash: 'teacher123',
      role: 'teacher'
    });

    const teacher1Profile = await Teacher.create({
      first_name: 'John',
      last_name: 'Smith',
      subject_teaches: 'Mathematics',
      user_id: teacher1.user_id
    });

    const teacher2 = await User.create({
      username: 'teacher2',
      email: 'teacher2@school.edu',
      password_hash: 'teacher123',
      role: 'teacher'
    });

    const teacher2Profile = await Teacher.create({
      first_name: 'Sarah',
      last_name: 'Johnson',
      subject_teaches: 'Science',
      user_id: teacher2.user_id
    });

    // Create parent users
    const parent1 = await User.create({
      username: 'parent1',
      email: 'parent1@school.edu',
      password_hash: 'parent123',
      role: 'parent'
    });

    const parent1Profile = await Parent.create({
      first_name: 'Michael',
      last_name: 'Brown',
      phone_number: '+1234567890',
      user_id: parent1.user_id
    });

    // Create student users
    const student1 = await User.create({
      username: 'student1',
      email: 'student1@school.edu',
      password_hash: 'student123',
      role: 'student'
    });

    const student1Profile = await Student.create({
      first_name: 'Emily',
      last_name: 'Brown',
      date_of_birth: '2010-05-15',
      user_id: student1.user_id,
      class_id: class1.class_id,
      parent_id: parent1Profile.parent_id
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();