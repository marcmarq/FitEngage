import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './src/database/database.db',
  driver: sqlite3.Database,
});

async function initDatabase() {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lastName TEXT NOT NULL,
      firstName TEXT NOT NULL,
      membershipExpiryDate DATE,
      membershipRenewalDate DATE,
      annualMembershipDate DATE,
      notes TEXT
    )
  `);

  // Insert sample data
  const sampleData = [
    { lastName: 'Somar', firstName: 'Jogesh', membershipExpiryDate: '2024-11-03', membershipRenewalDate: '2024-10-03', annualMembershipDate: '2024-10-03', notes: '' },
    { lastName: 'Eswadro', firstName: 'Christine Rose', membershipExpiryDate: '2024-11-03', membershipRenewalDate: '2024-10-03', annualMembershipDate: '2024-10-03', notes: '' },
    { lastName: 'Eswadro', firstName: 'Jimarie', membershipExpiryDate: '2024-11-03', membershipRenewalDate: '2024-10-03', annualMembershipDate: '2024-10-03', notes: '' },
    { lastName: 'Alvarez', firstName: 'Manfred', membershipExpiryDate: '2024-11-06', membershipRenewalDate: '2024-10-06', annualMembershipDate: '2024-10-01', notes: 'Gym and coaching' },
  ];

  const insertPromises = sampleData.map(member => {
    return db.run(`INSERT INTO members (lastName, firstName, membershipExpiryDate, membershipRenewalDate, annualMembershipDate, notes) VALUES (?, ?, ?, ?, ?, ?)`,
      member.lastName, member.firstName, member.membershipExpiryDate, member.membershipRenewalDate, member.annualMembershipDate, member.notes);
  });

  await Promise.all(insertPromises);
}

initDatabase().catch(err => console.error(err));

export default dbPromise;

import gql from "graphql-tag";

// Mutation to update a user
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

// Mutation to create a new member
export const CREATE_MEMBER_MUTATION = gql`
  mutation CreateMember($input: CreateMemberInput!) {
    createMember(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`;
