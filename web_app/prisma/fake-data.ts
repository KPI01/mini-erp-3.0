import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };
}
export function fakeItem() {
  return {
    descripcion: faker.lorem.words(5),
  };
}
export function fakeItemComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    descripcion: faker.lorem.words(5),
    activo: true,
    seccionId: 0,
  };
}
export function fakeSeccion() {
  return {
    nombre: faker.lorem.words(5),
    corto: faker.lorem.words(5),
  };
}
export function fakeSeccionComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    nombre: faker.lorem.words(5),
    corto: faker.lorem.words(5),
  };
}
export function fakeStock() {
  return {
    descripcion: faker.lorem.words(5),
    cant: faker.number.int(),
  };
}
export function fakeStockComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    fecha: new Date(),
    descripcion: faker.lorem.words(5),
    cant: faker.number.int(),
    itemId: faker.number.int(),
  };
}
