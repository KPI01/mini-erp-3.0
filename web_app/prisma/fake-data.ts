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
    activo: true,
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
    stockMin: 0,
    stockMax: 0,
    precio: 1,
    ubicacionId: undefined,
    unidadMedidaId: undefined,
  };
}
export function fakeUbicacion() {
  return {
    descripcion: faker.lorem.words(5),
    corto: faker.lorem.words(5),
  };
}
export function fakeUbicacionComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    descripcion: faker.lorem.words(5),
    corto: faker.lorem.words(5),
    isAlmacen: false,
    ubicacionId: undefined,
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
export function fakeUnidadMedida() {
  return {
    descripcion: faker.lorem.words(5),
    corto: faker.lorem.words(5),
  };
}
export function fakeUnidadMedidaComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    descripcion: faker.lorem.words(5),
    corto: faker.lorem.words(5),
  };
}
