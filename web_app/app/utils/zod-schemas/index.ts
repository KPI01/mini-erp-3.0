import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','name','email','password','activo']);

export const ItemScalarFieldEnumSchema = z.enum(['id','descripcion','activo','stockMin','stockMax','precio','ubicacionId','unidadMedidaId']);

export const UbicacionScalarFieldEnumSchema = z.enum(['id','descripcion','corto','isAlmacen','ubicacionId']);

export const StockScalarFieldEnumSchema = z.enum(['id','fecha','descripcion','cant','itemId']);

export const UnidadMedidaScalarFieldEnumSchema = z.enum(['id','descripcion','corto']);

export const ProveedorScalarFieldEnumSchema = z.enum(['id','nombre','razonSocial','idFiscal','direccion','correo','telefono','url','observaciones','activo']);

export const PedidoScalarFieldEnumSchema = z.enum(['id','proveedorId','creado','subTotal','totalImpuestos','total','fechaPrevista','fechaEntrega','pagado','entregado']);

export const ItemsOnPedidosScalarFieldEnumSchema = z.enum(['pedidoId','itemId','cant','precio','asignado']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  activo: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.number().int().optional(),
  activo: z.boolean().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// ITEM SCHEMA
/////////////////////////////////////////

export const ItemSchema = z.object({
  id: z.number().int(),
  descripcion: z.string(),
  activo: z.boolean(),
  stockMin: z.number(),
  stockMax: z.number(),
  precio: z.number(),
  ubicacionId: z.number().int().nullable(),
  unidadMedidaId: z.number().int().nullable(),
})

export type Item = z.infer<typeof ItemSchema>

// ITEM OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ItemOptionalDefaultsSchema = ItemSchema.merge(z.object({
  id: z.number().int().optional(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional(),
  stockMax: z.number().optional(),
  precio: z.number().optional(),
}))

export type ItemOptionalDefaults = z.infer<typeof ItemOptionalDefaultsSchema>

/////////////////////////////////////////
// UBICACION SCHEMA
/////////////////////////////////////////

export const UbicacionSchema = z.object({
  id: z.number().int(),
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean(),
  ubicacionId: z.number().int().nullable(),
})

export type Ubicacion = z.infer<typeof UbicacionSchema>

// UBICACION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UbicacionOptionalDefaultsSchema = UbicacionSchema.merge(z.object({
  id: z.number().int().optional(),
  isAlmacen: z.boolean().optional(),
}))

export type UbicacionOptionalDefaults = z.infer<typeof UbicacionOptionalDefaultsSchema>

/////////////////////////////////////////
// STOCK SCHEMA
/////////////////////////////////////////

export const StockSchema = z.object({
  id: z.number().int(),
  fecha: z.coerce.date(),
  descripcion: z.string(),
  cant: z.number().int(),
  itemId: z.number().int(),
})

export type Stock = z.infer<typeof StockSchema>

// STOCK OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const StockOptionalDefaultsSchema = StockSchema.merge(z.object({
  id: z.number().int().optional(),
  fecha: z.coerce.date().optional(),
}))

export type StockOptionalDefaults = z.infer<typeof StockOptionalDefaultsSchema>

/////////////////////////////////////////
// UNIDAD MEDIDA SCHEMA
/////////////////////////////////////////

export const UnidadMedidaSchema = z.object({
  id: z.number().int(),
  descripcion: z.string(),
  corto: z.string(),
})

export type UnidadMedida = z.infer<typeof UnidadMedidaSchema>

// UNIDAD MEDIDA OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UnidadMedidaOptionalDefaultsSchema = UnidadMedidaSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type UnidadMedidaOptionalDefaults = z.infer<typeof UnidadMedidaOptionalDefaultsSchema>

/////////////////////////////////////////
// PROVEEDOR SCHEMA
/////////////////////////////////////////

export const ProveedorSchema = z.object({
  id: z.number().int(),
  nombre: z.string(),
  razonSocial: z.string(),
  idFiscal: z.string(),
  direccion: z.string(),
  correo: z.string(),
  telefono: z.string(),
  url: z.string(),
  observaciones: z.string(),
  activo: z.boolean(),
})

export type Proveedor = z.infer<typeof ProveedorSchema>

// PROVEEDOR OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ProveedorOptionalDefaultsSchema = ProveedorSchema.merge(z.object({
  id: z.number().int().optional(),
  telefono: z.string().optional(),
  url: z.string().optional(),
  observaciones: z.string().optional(),
  activo: z.boolean().optional(),
}))

export type ProveedorOptionalDefaults = z.infer<typeof ProveedorOptionalDefaultsSchema>

/////////////////////////////////////////
// PEDIDO SCHEMA
/////////////////////////////////////////

export const PedidoSchema = z.object({
  id: z.number().int(),
  proveedorId: z.number().int(),
  creado: z.coerce.date(),
  subTotal: z.number(),
  totalImpuestos: z.number(),
  total: z.number(),
  fechaPrevista: z.coerce.date(),
  fechaEntrega: z.coerce.date(),
  pagado: z.boolean(),
  entregado: z.boolean(),
})

export type Pedido = z.infer<typeof PedidoSchema>

// PEDIDO OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PedidoOptionalDefaultsSchema = PedidoSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type PedidoOptionalDefaults = z.infer<typeof PedidoOptionalDefaultsSchema>

/////////////////////////////////////////
// ITEMS ON PEDIDOS SCHEMA
/////////////////////////////////////////

export const ItemsOnPedidosSchema = z.object({
  pedidoId: z.number().int(),
  itemId: z.number().int(),
  cant: z.number().int(),
  precio: z.number(),
  asignado: z.coerce.date(),
})

export type ItemsOnPedidos = z.infer<typeof ItemsOnPedidosSchema>

// ITEMS ON PEDIDOS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ItemsOnPedidosOptionalDefaultsSchema = ItemsOnPedidosSchema.merge(z.object({
  asignado: z.coerce.date().optional(),
}))

export type ItemsOnPedidosOptionalDefaults = z.infer<typeof ItemsOnPedidosOptionalDefaultsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  activo: z.boolean().optional(),
}).strict()

// ITEM
//------------------------------------------------------

export const ItemIncludeSchema: z.ZodType<Prisma.ItemInclude> = z.object({
  unidadMedida: z.union([z.boolean(),z.lazy(() => UnidadMedidaArgsSchema)]).optional(),
  ubicacion: z.union([z.boolean(),z.lazy(() => UbicacionArgsSchema)]).optional(),
  ItemsOnPedidos: z.union([z.boolean(),z.lazy(() => ItemsOnPedidosFindManyArgsSchema)]).optional(),
  stock: z.union([z.boolean(),z.lazy(() => StockFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ItemCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ItemArgsSchema: z.ZodType<Prisma.ItemDefaultArgs> = z.object({
  select: z.lazy(() => ItemSelectSchema).optional(),
  include: z.lazy(() => ItemIncludeSchema).optional(),
}).strict();

export const ItemCountOutputTypeArgsSchema: z.ZodType<Prisma.ItemCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ItemCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ItemCountOutputTypeSelectSchema: z.ZodType<Prisma.ItemCountOutputTypeSelect> = z.object({
  ItemsOnPedidos: z.boolean().optional(),
  stock: z.boolean().optional(),
}).strict();

export const ItemSelectSchema: z.ZodType<Prisma.ItemSelect> = z.object({
  id: z.boolean().optional(),
  descripcion: z.boolean().optional(),
  activo: z.boolean().optional(),
  stockMin: z.boolean().optional(),
  stockMax: z.boolean().optional(),
  precio: z.boolean().optional(),
  ubicacionId: z.boolean().optional(),
  unidadMedidaId: z.boolean().optional(),
  unidadMedida: z.union([z.boolean(),z.lazy(() => UnidadMedidaArgsSchema)]).optional(),
  ubicacion: z.union([z.boolean(),z.lazy(() => UbicacionArgsSchema)]).optional(),
  ItemsOnPedidos: z.union([z.boolean(),z.lazy(() => ItemsOnPedidosFindManyArgsSchema)]).optional(),
  stock: z.union([z.boolean(),z.lazy(() => StockFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ItemCountOutputTypeArgsSchema)]).optional(),
}).strict()

// UBICACION
//------------------------------------------------------

export const UbicacionIncludeSchema: z.ZodType<Prisma.UbicacionInclude> = z.object({
  item: z.union([z.boolean(),z.lazy(() => ItemFindManyArgsSchema)]).optional(),
  seccion: z.union([z.boolean(),z.lazy(() => UbicacionArgsSchema)]).optional(),
  almacen: z.union([z.boolean(),z.lazy(() => UbicacionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UbicacionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UbicacionArgsSchema: z.ZodType<Prisma.UbicacionDefaultArgs> = z.object({
  select: z.lazy(() => UbicacionSelectSchema).optional(),
  include: z.lazy(() => UbicacionIncludeSchema).optional(),
}).strict();

export const UbicacionCountOutputTypeArgsSchema: z.ZodType<Prisma.UbicacionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UbicacionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UbicacionCountOutputTypeSelectSchema: z.ZodType<Prisma.UbicacionCountOutputTypeSelect> = z.object({
  item: z.boolean().optional(),
  almacen: z.boolean().optional(),
}).strict();

export const UbicacionSelectSchema: z.ZodType<Prisma.UbicacionSelect> = z.object({
  id: z.boolean().optional(),
  descripcion: z.boolean().optional(),
  corto: z.boolean().optional(),
  isAlmacen: z.boolean().optional(),
  ubicacionId: z.boolean().optional(),
  item: z.union([z.boolean(),z.lazy(() => ItemFindManyArgsSchema)]).optional(),
  seccion: z.union([z.boolean(),z.lazy(() => UbicacionArgsSchema)]).optional(),
  almacen: z.union([z.boolean(),z.lazy(() => UbicacionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UbicacionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STOCK
//------------------------------------------------------

export const StockIncludeSchema: z.ZodType<Prisma.StockInclude> = z.object({
  item: z.union([z.boolean(),z.lazy(() => ItemArgsSchema)]).optional(),
}).strict()

export const StockArgsSchema: z.ZodType<Prisma.StockDefaultArgs> = z.object({
  select: z.lazy(() => StockSelectSchema).optional(),
  include: z.lazy(() => StockIncludeSchema).optional(),
}).strict();

export const StockSelectSchema: z.ZodType<Prisma.StockSelect> = z.object({
  id: z.boolean().optional(),
  fecha: z.boolean().optional(),
  descripcion: z.boolean().optional(),
  cant: z.boolean().optional(),
  itemId: z.boolean().optional(),
  item: z.union([z.boolean(),z.lazy(() => ItemArgsSchema)]).optional(),
}).strict()

// UNIDAD MEDIDA
//------------------------------------------------------

export const UnidadMedidaIncludeSchema: z.ZodType<Prisma.UnidadMedidaInclude> = z.object({
  Item: z.union([z.boolean(),z.lazy(() => ItemFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UnidadMedidaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UnidadMedidaArgsSchema: z.ZodType<Prisma.UnidadMedidaDefaultArgs> = z.object({
  select: z.lazy(() => UnidadMedidaSelectSchema).optional(),
  include: z.lazy(() => UnidadMedidaIncludeSchema).optional(),
}).strict();

export const UnidadMedidaCountOutputTypeArgsSchema: z.ZodType<Prisma.UnidadMedidaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UnidadMedidaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UnidadMedidaCountOutputTypeSelectSchema: z.ZodType<Prisma.UnidadMedidaCountOutputTypeSelect> = z.object({
  Item: z.boolean().optional(),
}).strict();

export const UnidadMedidaSelectSchema: z.ZodType<Prisma.UnidadMedidaSelect> = z.object({
  id: z.boolean().optional(),
  descripcion: z.boolean().optional(),
  corto: z.boolean().optional(),
  Item: z.union([z.boolean(),z.lazy(() => ItemFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UnidadMedidaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROVEEDOR
//------------------------------------------------------

export const ProveedorIncludeSchema: z.ZodType<Prisma.ProveedorInclude> = z.object({
  Pedido: z.union([z.boolean(),z.lazy(() => PedidoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProveedorCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProveedorArgsSchema: z.ZodType<Prisma.ProveedorDefaultArgs> = z.object({
  select: z.lazy(() => ProveedorSelectSchema).optional(),
  include: z.lazy(() => ProveedorIncludeSchema).optional(),
}).strict();

export const ProveedorCountOutputTypeArgsSchema: z.ZodType<Prisma.ProveedorCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProveedorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProveedorCountOutputTypeSelectSchema: z.ZodType<Prisma.ProveedorCountOutputTypeSelect> = z.object({
  Pedido: z.boolean().optional(),
}).strict();

export const ProveedorSelectSchema: z.ZodType<Prisma.ProveedorSelect> = z.object({
  id: z.boolean().optional(),
  nombre: z.boolean().optional(),
  razonSocial: z.boolean().optional(),
  idFiscal: z.boolean().optional(),
  direccion: z.boolean().optional(),
  correo: z.boolean().optional(),
  telefono: z.boolean().optional(),
  url: z.boolean().optional(),
  observaciones: z.boolean().optional(),
  activo: z.boolean().optional(),
  Pedido: z.union([z.boolean(),z.lazy(() => PedidoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProveedorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PEDIDO
//------------------------------------------------------

export const PedidoIncludeSchema: z.ZodType<Prisma.PedidoInclude> = z.object({
  ItemsOnPedidos: z.union([z.boolean(),z.lazy(() => ItemsOnPedidosFindManyArgsSchema)]).optional(),
  proveedor: z.union([z.boolean(),z.lazy(() => ProveedorArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PedidoCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PedidoArgsSchema: z.ZodType<Prisma.PedidoDefaultArgs> = z.object({
  select: z.lazy(() => PedidoSelectSchema).optional(),
  include: z.lazy(() => PedidoIncludeSchema).optional(),
}).strict();

export const PedidoCountOutputTypeArgsSchema: z.ZodType<Prisma.PedidoCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PedidoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PedidoCountOutputTypeSelectSchema: z.ZodType<Prisma.PedidoCountOutputTypeSelect> = z.object({
  ItemsOnPedidos: z.boolean().optional(),
}).strict();

export const PedidoSelectSchema: z.ZodType<Prisma.PedidoSelect> = z.object({
  id: z.boolean().optional(),
  proveedorId: z.boolean().optional(),
  creado: z.boolean().optional(),
  subTotal: z.boolean().optional(),
  totalImpuestos: z.boolean().optional(),
  total: z.boolean().optional(),
  fechaPrevista: z.boolean().optional(),
  fechaEntrega: z.boolean().optional(),
  pagado: z.boolean().optional(),
  entregado: z.boolean().optional(),
  ItemsOnPedidos: z.union([z.boolean(),z.lazy(() => ItemsOnPedidosFindManyArgsSchema)]).optional(),
  proveedor: z.union([z.boolean(),z.lazy(() => ProveedorArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PedidoCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ITEMS ON PEDIDOS
//------------------------------------------------------

export const ItemsOnPedidosIncludeSchema: z.ZodType<Prisma.ItemsOnPedidosInclude> = z.object({
  items: z.union([z.boolean(),z.lazy(() => ItemArgsSchema)]).optional(),
  pedido: z.union([z.boolean(),z.lazy(() => PedidoArgsSchema)]).optional(),
}).strict()

export const ItemsOnPedidosArgsSchema: z.ZodType<Prisma.ItemsOnPedidosDefaultArgs> = z.object({
  select: z.lazy(() => ItemsOnPedidosSelectSchema).optional(),
  include: z.lazy(() => ItemsOnPedidosIncludeSchema).optional(),
}).strict();

export const ItemsOnPedidosSelectSchema: z.ZodType<Prisma.ItemsOnPedidosSelect> = z.object({
  pedidoId: z.boolean().optional(),
  itemId: z.boolean().optional(),
  cant: z.boolean().optional(),
  precio: z.boolean().optional(),
  asignado: z.boolean().optional(),
  items: z.union([z.boolean(),z.lazy(() => ItemArgsSchema)]).optional(),
  pedido: z.union([z.boolean(),z.lazy(() => PedidoArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activo: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activo: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  activo: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const ItemWhereInputSchema: z.ZodType<Prisma.ItemWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activo: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  stockMin: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  stockMax: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  precio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ubicacionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  unidadMedidaId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  unidadMedida: z.union([ z.lazy(() => UnidadMedidaNullableScalarRelationFilterSchema),z.lazy(() => UnidadMedidaWhereInputSchema) ]).optional().nullable(),
  ubicacion: z.union([ z.lazy(() => UbicacionNullableScalarRelationFilterSchema),z.lazy(() => UbicacionWhereInputSchema) ]).optional().nullable(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosListRelationFilterSchema).optional(),
  stock: z.lazy(() => StockListRelationFilterSchema).optional()
}).strict();

export const ItemOrderByWithRelationInputSchema: z.ZodType<Prisma.ItemOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional(),
  stockMin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stockMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  precio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ubicacionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  unidadMedidaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  unidadMedida: z.lazy(() => UnidadMedidaOrderByWithRelationInputSchema).optional(),
  ubicacion: z.lazy(() => UbicacionOrderByWithRelationInputSchema).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosOrderByRelationAggregateInputSchema).optional(),
  stock: z.lazy(() => StockOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ItemWhereUniqueInputSchema: z.ZodType<Prisma.ItemWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activo: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  stockMin: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  stockMax: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  precio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ubicacionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  unidadMedidaId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  unidadMedida: z.union([ z.lazy(() => UnidadMedidaNullableScalarRelationFilterSchema),z.lazy(() => UnidadMedidaWhereInputSchema) ]).optional().nullable(),
  ubicacion: z.union([ z.lazy(() => UbicacionNullableScalarRelationFilterSchema),z.lazy(() => UbicacionWhereInputSchema) ]).optional().nullable(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosListRelationFilterSchema).optional(),
  stock: z.lazy(() => StockListRelationFilterSchema).optional()
}).strict());

export const ItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.ItemOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional(),
  stockMin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stockMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  precio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ubicacionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  unidadMedidaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ItemCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ItemAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ItemMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ItemMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ItemSumOrderByAggregateInputSchema).optional()
}).strict();

export const ItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ItemScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  activo: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  stockMin: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  stockMax: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  precio: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  ubicacionId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  unidadMedidaId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const UbicacionWhereInputSchema: z.ZodType<Prisma.UbicacionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UbicacionWhereInputSchema),z.lazy(() => UbicacionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UbicacionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UbicacionWhereInputSchema),z.lazy(() => UbicacionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  corto: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isAlmacen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ubicacionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  item: z.lazy(() => ItemListRelationFilterSchema).optional(),
  seccion: z.union([ z.lazy(() => UbicacionNullableScalarRelationFilterSchema),z.lazy(() => UbicacionWhereInputSchema) ]).optional().nullable(),
  almacen: z.lazy(() => UbicacionListRelationFilterSchema).optional()
}).strict();

export const UbicacionOrderByWithRelationInputSchema: z.ZodType<Prisma.UbicacionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  corto: z.lazy(() => SortOrderSchema).optional(),
  isAlmacen: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  item: z.lazy(() => ItemOrderByRelationAggregateInputSchema).optional(),
  seccion: z.lazy(() => UbicacionOrderByWithRelationInputSchema).optional(),
  almacen: z.lazy(() => UbicacionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UbicacionWhereUniqueInputSchema: z.ZodType<Prisma.UbicacionWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    corto: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    corto: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  corto: z.string().optional(),
  AND: z.union([ z.lazy(() => UbicacionWhereInputSchema),z.lazy(() => UbicacionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UbicacionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UbicacionWhereInputSchema),z.lazy(() => UbicacionWhereInputSchema).array() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isAlmacen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ubicacionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  item: z.lazy(() => ItemListRelationFilterSchema).optional(),
  seccion: z.union([ z.lazy(() => UbicacionNullableScalarRelationFilterSchema),z.lazy(() => UbicacionWhereInputSchema) ]).optional().nullable(),
  almacen: z.lazy(() => UbicacionListRelationFilterSchema).optional()
}).strict());

export const UbicacionOrderByWithAggregationInputSchema: z.ZodType<Prisma.UbicacionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  corto: z.lazy(() => SortOrderSchema).optional(),
  isAlmacen: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UbicacionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UbicacionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UbicacionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UbicacionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UbicacionSumOrderByAggregateInputSchema).optional()
}).strict();

export const UbicacionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UbicacionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UbicacionScalarWhereWithAggregatesInputSchema),z.lazy(() => UbicacionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UbicacionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UbicacionScalarWhereWithAggregatesInputSchema),z.lazy(() => UbicacionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  corto: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isAlmacen: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  ubicacionId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const StockWhereInputSchema: z.ZodType<Prisma.StockWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StockWhereInputSchema),z.lazy(() => StockWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StockWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StockWhereInputSchema),z.lazy(() => StockWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fecha: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cant: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  itemId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  item: z.union([ z.lazy(() => ItemScalarRelationFilterSchema),z.lazy(() => ItemWhereInputSchema) ]).optional(),
}).strict();

export const StockOrderByWithRelationInputSchema: z.ZodType<Prisma.StockOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fecha: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  item: z.lazy(() => ItemOrderByWithRelationInputSchema).optional()
}).strict();

export const StockWhereUniqueInputSchema: z.ZodType<Prisma.StockWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => StockWhereInputSchema),z.lazy(() => StockWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StockWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StockWhereInputSchema),z.lazy(() => StockWhereInputSchema).array() ]).optional(),
  fecha: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cant: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  itemId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  item: z.union([ z.lazy(() => ItemScalarRelationFilterSchema),z.lazy(() => ItemWhereInputSchema) ]).optional(),
}).strict());

export const StockOrderByWithAggregationInputSchema: z.ZodType<Prisma.StockOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fecha: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StockCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StockAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StockMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StockMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StockSumOrderByAggregateInputSchema).optional()
}).strict();

export const StockScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StockScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StockScalarWhereWithAggregatesInputSchema),z.lazy(() => StockScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StockScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StockScalarWhereWithAggregatesInputSchema),z.lazy(() => StockScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  fecha: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  cant: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  itemId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UnidadMedidaWhereInputSchema: z.ZodType<Prisma.UnidadMedidaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UnidadMedidaWhereInputSchema),z.lazy(() => UnidadMedidaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UnidadMedidaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UnidadMedidaWhereInputSchema),z.lazy(() => UnidadMedidaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  corto: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Item: z.lazy(() => ItemListRelationFilterSchema).optional()
}).strict();

export const UnidadMedidaOrderByWithRelationInputSchema: z.ZodType<Prisma.UnidadMedidaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  corto: z.lazy(() => SortOrderSchema).optional(),
  Item: z.lazy(() => ItemOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UnidadMedidaWhereUniqueInputSchema: z.ZodType<Prisma.UnidadMedidaWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    corto: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    corto: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  corto: z.string().optional(),
  AND: z.union([ z.lazy(() => UnidadMedidaWhereInputSchema),z.lazy(() => UnidadMedidaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UnidadMedidaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UnidadMedidaWhereInputSchema),z.lazy(() => UnidadMedidaWhereInputSchema).array() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Item: z.lazy(() => ItemListRelationFilterSchema).optional()
}).strict());

export const UnidadMedidaOrderByWithAggregationInputSchema: z.ZodType<Prisma.UnidadMedidaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  corto: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UnidadMedidaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UnidadMedidaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UnidadMedidaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UnidadMedidaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UnidadMedidaSumOrderByAggregateInputSchema).optional()
}).strict();

export const UnidadMedidaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UnidadMedidaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UnidadMedidaScalarWhereWithAggregatesInputSchema),z.lazy(() => UnidadMedidaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UnidadMedidaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UnidadMedidaScalarWhereWithAggregatesInputSchema),z.lazy(() => UnidadMedidaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  corto: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProveedorWhereInputSchema: z.ZodType<Prisma.ProveedorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProveedorWhereInputSchema),z.lazy(() => ProveedorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProveedorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProveedorWhereInputSchema),z.lazy(() => ProveedorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nombre: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  razonSocial: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idFiscal: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  direccion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  correo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  telefono: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  observaciones: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  activo: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Pedido: z.lazy(() => PedidoListRelationFilterSchema).optional()
}).strict();

export const ProveedorOrderByWithRelationInputSchema: z.ZodType<Prisma.ProveedorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nombre: z.lazy(() => SortOrderSchema).optional(),
  razonSocial: z.lazy(() => SortOrderSchema).optional(),
  idFiscal: z.lazy(() => SortOrderSchema).optional(),
  direccion: z.lazy(() => SortOrderSchema).optional(),
  correo: z.lazy(() => SortOrderSchema).optional(),
  telefono: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  observaciones: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  activo: z.lazy(() => SortOrderSchema).optional(),
  Pedido: z.lazy(() => PedidoOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProveedorWhereUniqueInputSchema: z.ZodType<Prisma.ProveedorWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    idFiscal: z.string(),
    correo: z.string()
  }),
  z.object({
    id: z.number().int(),
    idFiscal: z.string(),
  }),
  z.object({
    id: z.number().int(),
    correo: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    idFiscal: z.string(),
    correo: z.string(),
  }),
  z.object({
    idFiscal: z.string(),
  }),
  z.object({
    correo: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  idFiscal: z.string().optional(),
  correo: z.string().optional(),
  AND: z.union([ z.lazy(() => ProveedorWhereInputSchema),z.lazy(() => ProveedorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProveedorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProveedorWhereInputSchema),z.lazy(() => ProveedorWhereInputSchema).array() ]).optional(),
  nombre: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  razonSocial: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  direccion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  telefono: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  observaciones: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  activo: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Pedido: z.lazy(() => PedidoListRelationFilterSchema).optional()
}).strict());

export const ProveedorOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProveedorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nombre: z.lazy(() => SortOrderSchema).optional(),
  razonSocial: z.lazy(() => SortOrderSchema).optional(),
  idFiscal: z.lazy(() => SortOrderSchema).optional(),
  direccion: z.lazy(() => SortOrderSchema).optional(),
  correo: z.lazy(() => SortOrderSchema).optional(),
  telefono: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  observaciones: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  activo: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProveedorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProveedorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProveedorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProveedorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProveedorSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProveedorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProveedorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProveedorScalarWhereWithAggregatesInputSchema),z.lazy(() => ProveedorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProveedorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProveedorScalarWhereWithAggregatesInputSchema),z.lazy(() => ProveedorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  nombre: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  razonSocial: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  idFiscal: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  direccion: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  correo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  telefono: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  observaciones: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  activo: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const PedidoWhereInputSchema: z.ZodType<Prisma.PedidoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PedidoWhereInputSchema),z.lazy(() => PedidoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PedidoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PedidoWhereInputSchema),z.lazy(() => PedidoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  proveedorId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  creado: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  subTotal: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalImpuestos: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  total: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  fechaPrevista: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fechaEntrega: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pagado: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  entregado: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosListRelationFilterSchema).optional(),
  proveedor: z.union([ z.lazy(() => ProveedorScalarRelationFilterSchema),z.lazy(() => ProveedorWhereInputSchema) ]).optional(),
}).strict();

export const PedidoOrderByWithRelationInputSchema: z.ZodType<Prisma.PedidoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  proveedorId: z.lazy(() => SortOrderSchema).optional(),
  creado: z.lazy(() => SortOrderSchema).optional(),
  subTotal: z.lazy(() => SortOrderSchema).optional(),
  totalImpuestos: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  fechaPrevista: z.lazy(() => SortOrderSchema).optional(),
  fechaEntrega: z.lazy(() => SortOrderSchema).optional(),
  pagado: z.lazy(() => SortOrderSchema).optional(),
  entregado: z.lazy(() => SortOrderSchema).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosOrderByRelationAggregateInputSchema).optional(),
  proveedor: z.lazy(() => ProveedorOrderByWithRelationInputSchema).optional()
}).strict();

export const PedidoWhereUniqueInputSchema: z.ZodType<Prisma.PedidoWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PedidoWhereInputSchema),z.lazy(() => PedidoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PedidoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PedidoWhereInputSchema),z.lazy(() => PedidoWhereInputSchema).array() ]).optional(),
  proveedorId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  creado: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  subTotal: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalImpuestos: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  total: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  fechaPrevista: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fechaEntrega: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pagado: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  entregado: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosListRelationFilterSchema).optional(),
  proveedor: z.union([ z.lazy(() => ProveedorScalarRelationFilterSchema),z.lazy(() => ProveedorWhereInputSchema) ]).optional(),
}).strict());

export const PedidoOrderByWithAggregationInputSchema: z.ZodType<Prisma.PedidoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  proveedorId: z.lazy(() => SortOrderSchema).optional(),
  creado: z.lazy(() => SortOrderSchema).optional(),
  subTotal: z.lazy(() => SortOrderSchema).optional(),
  totalImpuestos: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  fechaPrevista: z.lazy(() => SortOrderSchema).optional(),
  fechaEntrega: z.lazy(() => SortOrderSchema).optional(),
  pagado: z.lazy(() => SortOrderSchema).optional(),
  entregado: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PedidoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PedidoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PedidoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PedidoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PedidoSumOrderByAggregateInputSchema).optional()
}).strict();

export const PedidoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PedidoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PedidoScalarWhereWithAggregatesInputSchema),z.lazy(() => PedidoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PedidoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PedidoScalarWhereWithAggregatesInputSchema),z.lazy(() => PedidoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  proveedorId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  creado: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  subTotal: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  totalImpuestos: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  total: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  fechaPrevista: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fechaEntrega: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  pagado: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  entregado: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const ItemsOnPedidosWhereInputSchema: z.ZodType<Prisma.ItemsOnPedidosWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemsOnPedidosWhereInputSchema),z.lazy(() => ItemsOnPedidosWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsOnPedidosWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsOnPedidosWhereInputSchema),z.lazy(() => ItemsOnPedidosWhereInputSchema).array() ]).optional(),
  pedidoId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  itemId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cant: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  precio: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  asignado: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  items: z.union([ z.lazy(() => ItemScalarRelationFilterSchema),z.lazy(() => ItemWhereInputSchema) ]).optional(),
  pedido: z.union([ z.lazy(() => PedidoScalarRelationFilterSchema),z.lazy(() => PedidoWhereInputSchema) ]).optional(),
}).strict();

export const ItemsOnPedidosOrderByWithRelationInputSchema: z.ZodType<Prisma.ItemsOnPedidosOrderByWithRelationInput> = z.object({
  pedidoId: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional(),
  asignado: z.lazy(() => SortOrderSchema).optional(),
  items: z.lazy(() => ItemOrderByWithRelationInputSchema).optional(),
  pedido: z.lazy(() => PedidoOrderByWithRelationInputSchema).optional()
}).strict();

export const ItemsOnPedidosWhereUniqueInputSchema: z.ZodType<Prisma.ItemsOnPedidosWhereUniqueInput> = z.object({
  itemId_pedidoId: z.lazy(() => ItemsOnPedidosItemIdPedidoIdCompoundUniqueInputSchema)
})
.and(z.object({
  itemId_pedidoId: z.lazy(() => ItemsOnPedidosItemIdPedidoIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ItemsOnPedidosWhereInputSchema),z.lazy(() => ItemsOnPedidosWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsOnPedidosWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsOnPedidosWhereInputSchema),z.lazy(() => ItemsOnPedidosWhereInputSchema).array() ]).optional(),
  pedidoId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  itemId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  cant: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  precio: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  asignado: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  items: z.union([ z.lazy(() => ItemScalarRelationFilterSchema),z.lazy(() => ItemWhereInputSchema) ]).optional(),
  pedido: z.union([ z.lazy(() => PedidoScalarRelationFilterSchema),z.lazy(() => PedidoWhereInputSchema) ]).optional(),
}).strict());

export const ItemsOnPedidosOrderByWithAggregationInputSchema: z.ZodType<Prisma.ItemsOnPedidosOrderByWithAggregationInput> = z.object({
  pedidoId: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional(),
  asignado: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ItemsOnPedidosCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ItemsOnPedidosAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ItemsOnPedidosMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ItemsOnPedidosMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ItemsOnPedidosSumOrderByAggregateInputSchema).optional()
}).strict();

export const ItemsOnPedidosScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ItemsOnPedidosScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ItemsOnPedidosScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemsOnPedidosScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsOnPedidosScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsOnPedidosScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemsOnPedidosScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  pedidoId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  itemId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  cant: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  precio: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  asignado: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  activo: z.boolean().optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  activo: z.boolean().optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  activo: z.boolean().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemCreateInputSchema: z.ZodType<Prisma.ItemCreateInput> = z.object({
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  unidadMedida: z.lazy(() => UnidadMedidaCreateNestedOneWithoutItemInputSchema).optional(),
  ubicacion: z.lazy(() => UbicacionCreateNestedOneWithoutItemInputSchema).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosCreateNestedManyWithoutItemsInputSchema).optional(),
  stock: z.lazy(() => StockCreateNestedManyWithoutItemInputSchema).optional()
}).strict();

export const ItemUncheckedCreateInputSchema: z.ZodType<Prisma.ItemUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  ubicacionId: z.number().int().optional().nullable(),
  unidadMedidaId: z.number().int().optional().nullable(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedCreateNestedManyWithoutItemsInputSchema).optional(),
  stock: z.lazy(() => StockUncheckedCreateNestedManyWithoutItemInputSchema).optional()
}).strict();

export const ItemUpdateInputSchema: z.ZodType<Prisma.ItemUpdateInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unidadMedida: z.lazy(() => UnidadMedidaUpdateOneWithoutItemNestedInputSchema).optional(),
  ubicacion: z.lazy(() => UbicacionUpdateOneWithoutItemNestedInputSchema).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUpdateManyWithoutItemsNestedInputSchema).optional(),
  stock: z.lazy(() => StockUpdateManyWithoutItemNestedInputSchema).optional()
}).strict();

export const ItemUncheckedUpdateInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ubicacionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unidadMedidaId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedUpdateManyWithoutItemsNestedInputSchema).optional(),
  stock: z.lazy(() => StockUncheckedUpdateManyWithoutItemNestedInputSchema).optional()
}).strict();

export const ItemCreateManyInputSchema: z.ZodType<Prisma.ItemCreateManyInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  ubicacionId: z.number().int().optional().nullable(),
  unidadMedidaId: z.number().int().optional().nullable()
}).strict();

export const ItemUpdateManyMutationInputSchema: z.ZodType<Prisma.ItemUpdateManyMutationInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ubicacionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unidadMedidaId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UbicacionCreateInputSchema: z.ZodType<Prisma.UbicacionCreateInput> = z.object({
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean().optional(),
  item: z.lazy(() => ItemCreateNestedManyWithoutUbicacionInputSchema).optional(),
  seccion: z.lazy(() => UbicacionCreateNestedOneWithoutAlmacenInputSchema).optional(),
  almacen: z.lazy(() => UbicacionCreateNestedManyWithoutSeccionInputSchema).optional()
}).strict();

export const UbicacionUncheckedCreateInputSchema: z.ZodType<Prisma.UbicacionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean().optional(),
  ubicacionId: z.number().int().optional().nullable(),
  item: z.lazy(() => ItemUncheckedCreateNestedManyWithoutUbicacionInputSchema).optional(),
  almacen: z.lazy(() => UbicacionUncheckedCreateNestedManyWithoutSeccionInputSchema).optional()
}).strict();

export const UbicacionUpdateInputSchema: z.ZodType<Prisma.UbicacionUpdateInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  item: z.lazy(() => ItemUpdateManyWithoutUbicacionNestedInputSchema).optional(),
  seccion: z.lazy(() => UbicacionUpdateOneWithoutAlmacenNestedInputSchema).optional(),
  almacen: z.lazy(() => UbicacionUpdateManyWithoutSeccionNestedInputSchema).optional()
}).strict();

export const UbicacionUncheckedUpdateInputSchema: z.ZodType<Prisma.UbicacionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ubicacionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  item: z.lazy(() => ItemUncheckedUpdateManyWithoutUbicacionNestedInputSchema).optional(),
  almacen: z.lazy(() => UbicacionUncheckedUpdateManyWithoutSeccionNestedInputSchema).optional()
}).strict();

export const UbicacionCreateManyInputSchema: z.ZodType<Prisma.UbicacionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean().optional(),
  ubicacionId: z.number().int().optional().nullable()
}).strict();

export const UbicacionUpdateManyMutationInputSchema: z.ZodType<Prisma.UbicacionUpdateManyMutationInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UbicacionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UbicacionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ubicacionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StockCreateInputSchema: z.ZodType<Prisma.StockCreateInput> = z.object({
  fecha: z.coerce.date().optional(),
  descripcion: z.string(),
  cant: z.number().int(),
  item: z.lazy(() => ItemCreateNestedOneWithoutStockInputSchema)
}).strict();

export const StockUncheckedCreateInputSchema: z.ZodType<Prisma.StockUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  fecha: z.coerce.date().optional(),
  descripcion: z.string(),
  cant: z.number().int(),
  itemId: z.number().int()
}).strict();

export const StockUpdateInputSchema: z.ZodType<Prisma.StockUpdateInput> = z.object({
  fecha: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  item: z.lazy(() => ItemUpdateOneRequiredWithoutStockNestedInputSchema).optional()
}).strict();

export const StockUncheckedUpdateInputSchema: z.ZodType<Prisma.StockUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fecha: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StockCreateManyInputSchema: z.ZodType<Prisma.StockCreateManyInput> = z.object({
  id: z.number().int().optional(),
  fecha: z.coerce.date().optional(),
  descripcion: z.string(),
  cant: z.number().int(),
  itemId: z.number().int()
}).strict();

export const StockUpdateManyMutationInputSchema: z.ZodType<Prisma.StockUpdateManyMutationInput> = z.object({
  fecha: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StockUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StockUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fecha: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnidadMedidaCreateInputSchema: z.ZodType<Prisma.UnidadMedidaCreateInput> = z.object({
  descripcion: z.string(),
  corto: z.string(),
  Item: z.lazy(() => ItemCreateNestedManyWithoutUnidadMedidaInputSchema).optional()
}).strict();

export const UnidadMedidaUncheckedCreateInputSchema: z.ZodType<Prisma.UnidadMedidaUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  corto: z.string(),
  Item: z.lazy(() => ItemUncheckedCreateNestedManyWithoutUnidadMedidaInputSchema).optional()
}).strict();

export const UnidadMedidaUpdateInputSchema: z.ZodType<Prisma.UnidadMedidaUpdateInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Item: z.lazy(() => ItemUpdateManyWithoutUnidadMedidaNestedInputSchema).optional()
}).strict();

export const UnidadMedidaUncheckedUpdateInputSchema: z.ZodType<Prisma.UnidadMedidaUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Item: z.lazy(() => ItemUncheckedUpdateManyWithoutUnidadMedidaNestedInputSchema).optional()
}).strict();

export const UnidadMedidaCreateManyInputSchema: z.ZodType<Prisma.UnidadMedidaCreateManyInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  corto: z.string()
}).strict();

export const UnidadMedidaUpdateManyMutationInputSchema: z.ZodType<Prisma.UnidadMedidaUpdateManyMutationInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnidadMedidaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UnidadMedidaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProveedorCreateInputSchema: z.ZodType<Prisma.ProveedorCreateInput> = z.object({
  nombre: z.string(),
  razonSocial: z.string(),
  idFiscal: z.string(),
  direccion: z.string(),
  correo: z.string(),
  telefono: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  observaciones: z.string().optional().nullable(),
  activo: z.boolean().optional(),
  Pedido: z.lazy(() => PedidoCreateNestedManyWithoutProveedorInputSchema).optional()
}).strict();

export const ProveedorUncheckedCreateInputSchema: z.ZodType<Prisma.ProveedorUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  nombre: z.string(),
  razonSocial: z.string(),
  idFiscal: z.string(),
  direccion: z.string(),
  correo: z.string(),
  telefono: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  observaciones: z.string().optional().nullable(),
  activo: z.boolean().optional(),
  Pedido: z.lazy(() => PedidoUncheckedCreateNestedManyWithoutProveedorInputSchema).optional()
}).strict();

export const ProveedorUpdateInputSchema: z.ZodType<Prisma.ProveedorUpdateInput> = z.object({
  nombre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  razonSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idFiscal: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direccion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  correo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefono: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observaciones: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Pedido: z.lazy(() => PedidoUpdateManyWithoutProveedorNestedInputSchema).optional()
}).strict();

export const ProveedorUncheckedUpdateInputSchema: z.ZodType<Prisma.ProveedorUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nombre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  razonSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idFiscal: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direccion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  correo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefono: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observaciones: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Pedido: z.lazy(() => PedidoUncheckedUpdateManyWithoutProveedorNestedInputSchema).optional()
}).strict();

export const ProveedorCreateManyInputSchema: z.ZodType<Prisma.ProveedorCreateManyInput> = z.object({
  id: z.number().int().optional(),
  nombre: z.string(),
  razonSocial: z.string(),
  idFiscal: z.string(),
  direccion: z.string(),
  correo: z.string(),
  telefono: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  observaciones: z.string().optional().nullable(),
  activo: z.boolean().optional()
}).strict();

export const ProveedorUpdateManyMutationInputSchema: z.ZodType<Prisma.ProveedorUpdateManyMutationInput> = z.object({
  nombre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  razonSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idFiscal: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direccion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  correo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefono: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observaciones: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProveedorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProveedorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nombre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  razonSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idFiscal: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direccion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  correo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefono: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observaciones: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PedidoCreateInputSchema: z.ZodType<Prisma.PedidoCreateInput> = z.object({
  creado: z.coerce.date(),
  subTotal: z.number(),
  totalImpuestos: z.number(),
  total: z.number(),
  fechaPrevista: z.coerce.date(),
  fechaEntrega: z.coerce.date(),
  pagado: z.boolean(),
  entregado: z.boolean(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosCreateNestedManyWithoutPedidoInputSchema).optional(),
  proveedor: z.lazy(() => ProveedorCreateNestedOneWithoutPedidoInputSchema)
}).strict();

export const PedidoUncheckedCreateInputSchema: z.ZodType<Prisma.PedidoUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  proveedorId: z.number().int(),
  creado: z.coerce.date(),
  subTotal: z.number(),
  totalImpuestos: z.number(),
  total: z.number(),
  fechaPrevista: z.coerce.date(),
  fechaEntrega: z.coerce.date(),
  pagado: z.boolean(),
  entregado: z.boolean(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedCreateNestedManyWithoutPedidoInputSchema).optional()
}).strict();

export const PedidoUpdateInputSchema: z.ZodType<Prisma.PedidoUpdateInput> = z.object({
  creado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalImpuestos: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fechaPrevista: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fechaEntrega: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pagado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entregado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUpdateManyWithoutPedidoNestedInputSchema).optional(),
  proveedor: z.lazy(() => ProveedorUpdateOneRequiredWithoutPedidoNestedInputSchema).optional()
}).strict();

export const PedidoUncheckedUpdateInputSchema: z.ZodType<Prisma.PedidoUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  proveedorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  creado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalImpuestos: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fechaPrevista: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fechaEntrega: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pagado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entregado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedUpdateManyWithoutPedidoNestedInputSchema).optional()
}).strict();

export const PedidoCreateManyInputSchema: z.ZodType<Prisma.PedidoCreateManyInput> = z.object({
  id: z.number().int().optional(),
  proveedorId: z.number().int(),
  creado: z.coerce.date(),
  subTotal: z.number(),
  totalImpuestos: z.number(),
  total: z.number(),
  fechaPrevista: z.coerce.date(),
  fechaEntrega: z.coerce.date(),
  pagado: z.boolean(),
  entregado: z.boolean()
}).strict();

export const PedidoUpdateManyMutationInputSchema: z.ZodType<Prisma.PedidoUpdateManyMutationInput> = z.object({
  creado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalImpuestos: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fechaPrevista: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fechaEntrega: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pagado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entregado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PedidoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PedidoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  proveedorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  creado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalImpuestos: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fechaPrevista: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fechaEntrega: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pagado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entregado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsOnPedidosCreateInputSchema: z.ZodType<Prisma.ItemsOnPedidosCreateInput> = z.object({
  cant: z.number().int(),
  precio: z.number(),
  asignado: z.coerce.date().optional(),
  items: z.lazy(() => ItemCreateNestedOneWithoutItemsOnPedidosInputSchema),
  pedido: z.lazy(() => PedidoCreateNestedOneWithoutItemsOnPedidosInputSchema)
}).strict();

export const ItemsOnPedidosUncheckedCreateInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedCreateInput> = z.object({
  pedidoId: z.number().int(),
  itemId: z.number().int(),
  cant: z.number().int(),
  precio: z.number(),
  asignado: z.coerce.date().optional()
}).strict();

export const ItemsOnPedidosUpdateInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateInput> = z.object({
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  precio: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  asignado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => ItemUpdateOneRequiredWithoutItemsOnPedidosNestedInputSchema).optional(),
  pedido: z.lazy(() => PedidoUpdateOneRequiredWithoutItemsOnPedidosNestedInputSchema).optional()
}).strict();

export const ItemsOnPedidosUncheckedUpdateInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedUpdateInput> = z.object({
  pedidoId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  precio: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  asignado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsOnPedidosCreateManyInputSchema: z.ZodType<Prisma.ItemsOnPedidosCreateManyInput> = z.object({
  pedidoId: z.number().int(),
  itemId: z.number().int(),
  cant: z.number().int(),
  precio: z.number(),
  asignado: z.coerce.date().optional()
}).strict();

export const ItemsOnPedidosUpdateManyMutationInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateManyMutationInput> = z.object({
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  precio: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  asignado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsOnPedidosUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedUpdateManyInput> = z.object({
  pedidoId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  precio: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  asignado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UnidadMedidaNullableScalarRelationFilterSchema: z.ZodType<Prisma.UnidadMedidaNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UnidadMedidaWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UnidadMedidaWhereInputSchema).optional().nullable()
}).strict();

export const UbicacionNullableScalarRelationFilterSchema: z.ZodType<Prisma.UbicacionNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UbicacionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UbicacionWhereInputSchema).optional().nullable()
}).strict();

export const ItemsOnPedidosListRelationFilterSchema: z.ZodType<Prisma.ItemsOnPedidosListRelationFilter> = z.object({
  every: z.lazy(() => ItemsOnPedidosWhereInputSchema).optional(),
  some: z.lazy(() => ItemsOnPedidosWhereInputSchema).optional(),
  none: z.lazy(() => ItemsOnPedidosWhereInputSchema).optional()
}).strict();

export const StockListRelationFilterSchema: z.ZodType<Prisma.StockListRelationFilter> = z.object({
  every: z.lazy(() => StockWhereInputSchema).optional(),
  some: z.lazy(() => StockWhereInputSchema).optional(),
  none: z.lazy(() => StockWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ItemsOnPedidosOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ItemsOnPedidosOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StockOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StockOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.ItemCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional(),
  stockMin: z.lazy(() => SortOrderSchema).optional(),
  stockMax: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.lazy(() => SortOrderSchema).optional(),
  unidadMedidaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ItemAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  stockMin: z.lazy(() => SortOrderSchema).optional(),
  stockMax: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.lazy(() => SortOrderSchema).optional(),
  unidadMedidaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ItemMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional(),
  stockMin: z.lazy(() => SortOrderSchema).optional(),
  stockMax: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.lazy(() => SortOrderSchema).optional(),
  unidadMedidaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.ItemMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional(),
  stockMin: z.lazy(() => SortOrderSchema).optional(),
  stockMax: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.lazy(() => SortOrderSchema).optional(),
  unidadMedidaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.ItemSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  stockMin: z.lazy(() => SortOrderSchema).optional(),
  stockMax: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.lazy(() => SortOrderSchema).optional(),
  unidadMedidaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const ItemListRelationFilterSchema: z.ZodType<Prisma.ItemListRelationFilter> = z.object({
  every: z.lazy(() => ItemWhereInputSchema).optional(),
  some: z.lazy(() => ItemWhereInputSchema).optional(),
  none: z.lazy(() => ItemWhereInputSchema).optional()
}).strict();

export const UbicacionListRelationFilterSchema: z.ZodType<Prisma.UbicacionListRelationFilter> = z.object({
  every: z.lazy(() => UbicacionWhereInputSchema).optional(),
  some: z.lazy(() => UbicacionWhereInputSchema).optional(),
  none: z.lazy(() => UbicacionWhereInputSchema).optional()
}).strict();

export const ItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ItemOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UbicacionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UbicacionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UbicacionCountOrderByAggregateInputSchema: z.ZodType<Prisma.UbicacionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  corto: z.lazy(() => SortOrderSchema).optional(),
  isAlmacen: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UbicacionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UbicacionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UbicacionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UbicacionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  corto: z.lazy(() => SortOrderSchema).optional(),
  isAlmacen: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UbicacionMinOrderByAggregateInputSchema: z.ZodType<Prisma.UbicacionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  corto: z.lazy(() => SortOrderSchema).optional(),
  isAlmacen: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UbicacionSumOrderByAggregateInputSchema: z.ZodType<Prisma.UbicacionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ubicacionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ItemScalarRelationFilterSchema: z.ZodType<Prisma.ItemScalarRelationFilter> = z.object({
  is: z.lazy(() => ItemWhereInputSchema).optional(),
  isNot: z.lazy(() => ItemWhereInputSchema).optional()
}).strict();

export const StockCountOrderByAggregateInputSchema: z.ZodType<Prisma.StockCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fecha: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StockAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StockAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StockMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StockMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fecha: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StockMinOrderByAggregateInputSchema: z.ZodType<Prisma.StockMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fecha: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StockSumOrderByAggregateInputSchema: z.ZodType<Prisma.StockSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UnidadMedidaCountOrderByAggregateInputSchema: z.ZodType<Prisma.UnidadMedidaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  corto: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnidadMedidaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UnidadMedidaAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnidadMedidaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UnidadMedidaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  corto: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnidadMedidaMinOrderByAggregateInputSchema: z.ZodType<Prisma.UnidadMedidaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  descripcion: z.lazy(() => SortOrderSchema).optional(),
  corto: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnidadMedidaSumOrderByAggregateInputSchema: z.ZodType<Prisma.UnidadMedidaSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PedidoListRelationFilterSchema: z.ZodType<Prisma.PedidoListRelationFilter> = z.object({
  every: z.lazy(() => PedidoWhereInputSchema).optional(),
  some: z.lazy(() => PedidoWhereInputSchema).optional(),
  none: z.lazy(() => PedidoWhereInputSchema).optional()
}).strict();

export const PedidoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PedidoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProveedorCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProveedorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nombre: z.lazy(() => SortOrderSchema).optional(),
  razonSocial: z.lazy(() => SortOrderSchema).optional(),
  idFiscal: z.lazy(() => SortOrderSchema).optional(),
  direccion: z.lazy(() => SortOrderSchema).optional(),
  correo: z.lazy(() => SortOrderSchema).optional(),
  telefono: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  observaciones: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProveedorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProveedorAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProveedorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProveedorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nombre: z.lazy(() => SortOrderSchema).optional(),
  razonSocial: z.lazy(() => SortOrderSchema).optional(),
  idFiscal: z.lazy(() => SortOrderSchema).optional(),
  direccion: z.lazy(() => SortOrderSchema).optional(),
  correo: z.lazy(() => SortOrderSchema).optional(),
  telefono: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  observaciones: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProveedorMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProveedorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nombre: z.lazy(() => SortOrderSchema).optional(),
  razonSocial: z.lazy(() => SortOrderSchema).optional(),
  idFiscal: z.lazy(() => SortOrderSchema).optional(),
  direccion: z.lazy(() => SortOrderSchema).optional(),
  correo: z.lazy(() => SortOrderSchema).optional(),
  telefono: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  observaciones: z.lazy(() => SortOrderSchema).optional(),
  activo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProveedorSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProveedorSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const ProveedorScalarRelationFilterSchema: z.ZodType<Prisma.ProveedorScalarRelationFilter> = z.object({
  is: z.lazy(() => ProveedorWhereInputSchema).optional(),
  isNot: z.lazy(() => ProveedorWhereInputSchema).optional()
}).strict();

export const PedidoCountOrderByAggregateInputSchema: z.ZodType<Prisma.PedidoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  proveedorId: z.lazy(() => SortOrderSchema).optional(),
  creado: z.lazy(() => SortOrderSchema).optional(),
  subTotal: z.lazy(() => SortOrderSchema).optional(),
  totalImpuestos: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  fechaPrevista: z.lazy(() => SortOrderSchema).optional(),
  fechaEntrega: z.lazy(() => SortOrderSchema).optional(),
  pagado: z.lazy(() => SortOrderSchema).optional(),
  entregado: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PedidoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PedidoAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  proveedorId: z.lazy(() => SortOrderSchema).optional(),
  subTotal: z.lazy(() => SortOrderSchema).optional(),
  totalImpuestos: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PedidoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PedidoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  proveedorId: z.lazy(() => SortOrderSchema).optional(),
  creado: z.lazy(() => SortOrderSchema).optional(),
  subTotal: z.lazy(() => SortOrderSchema).optional(),
  totalImpuestos: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  fechaPrevista: z.lazy(() => SortOrderSchema).optional(),
  fechaEntrega: z.lazy(() => SortOrderSchema).optional(),
  pagado: z.lazy(() => SortOrderSchema).optional(),
  entregado: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PedidoMinOrderByAggregateInputSchema: z.ZodType<Prisma.PedidoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  proveedorId: z.lazy(() => SortOrderSchema).optional(),
  creado: z.lazy(() => SortOrderSchema).optional(),
  subTotal: z.lazy(() => SortOrderSchema).optional(),
  totalImpuestos: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  fechaPrevista: z.lazy(() => SortOrderSchema).optional(),
  fechaEntrega: z.lazy(() => SortOrderSchema).optional(),
  pagado: z.lazy(() => SortOrderSchema).optional(),
  entregado: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PedidoSumOrderByAggregateInputSchema: z.ZodType<Prisma.PedidoSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  proveedorId: z.lazy(() => SortOrderSchema).optional(),
  subTotal: z.lazy(() => SortOrderSchema).optional(),
  totalImpuestos: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const PedidoScalarRelationFilterSchema: z.ZodType<Prisma.PedidoScalarRelationFilter> = z.object({
  is: z.lazy(() => PedidoWhereInputSchema).optional(),
  isNot: z.lazy(() => PedidoWhereInputSchema).optional()
}).strict();

export const ItemsOnPedidosItemIdPedidoIdCompoundUniqueInputSchema: z.ZodType<Prisma.ItemsOnPedidosItemIdPedidoIdCompoundUniqueInput> = z.object({
  itemId: z.number(),
  pedidoId: z.number()
}).strict();

export const ItemsOnPedidosCountOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsOnPedidosCountOrderByAggregateInput> = z.object({
  pedidoId: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional(),
  asignado: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsOnPedidosAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsOnPedidosAvgOrderByAggregateInput> = z.object({
  pedidoId: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsOnPedidosMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsOnPedidosMaxOrderByAggregateInput> = z.object({
  pedidoId: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional(),
  asignado: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsOnPedidosMinOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsOnPedidosMinOrderByAggregateInput> = z.object({
  pedidoId: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional(),
  asignado: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsOnPedidosSumOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsOnPedidosSumOrderByAggregateInput> = z.object({
  pedidoId: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  cant: z.lazy(() => SortOrderSchema).optional(),
  precio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UnidadMedidaCreateNestedOneWithoutItemInputSchema: z.ZodType<Prisma.UnidadMedidaCreateNestedOneWithoutItemInput> = z.object({
  create: z.union([ z.lazy(() => UnidadMedidaCreateWithoutItemInputSchema),z.lazy(() => UnidadMedidaUncheckedCreateWithoutItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnidadMedidaCreateOrConnectWithoutItemInputSchema).optional(),
  connect: z.lazy(() => UnidadMedidaWhereUniqueInputSchema).optional()
}).strict();

export const UbicacionCreateNestedOneWithoutItemInputSchema: z.ZodType<Prisma.UbicacionCreateNestedOneWithoutItemInput> = z.object({
  create: z.union([ z.lazy(() => UbicacionCreateWithoutItemInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UbicacionCreateOrConnectWithoutItemInputSchema).optional(),
  connect: z.lazy(() => UbicacionWhereUniqueInputSchema).optional()
}).strict();

export const ItemsOnPedidosCreateNestedManyWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosCreateNestedManyWithoutItemsInput> = z.object({
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosCreateWithoutItemsInputSchema).array(),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutItemsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsOnPedidosCreateManyItemsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StockCreateNestedManyWithoutItemInputSchema: z.ZodType<Prisma.StockCreateNestedManyWithoutItemInput> = z.object({
  create: z.union([ z.lazy(() => StockCreateWithoutItemInputSchema),z.lazy(() => StockCreateWithoutItemInputSchema).array(),z.lazy(() => StockUncheckedCreateWithoutItemInputSchema),z.lazy(() => StockUncheckedCreateWithoutItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StockCreateOrConnectWithoutItemInputSchema),z.lazy(() => StockCreateOrConnectWithoutItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StockCreateManyItemInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StockWhereUniqueInputSchema),z.lazy(() => StockWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItemsOnPedidosUncheckedCreateNestedManyWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedCreateNestedManyWithoutItemsInput> = z.object({
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosCreateWithoutItemsInputSchema).array(),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutItemsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsOnPedidosCreateManyItemsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StockUncheckedCreateNestedManyWithoutItemInputSchema: z.ZodType<Prisma.StockUncheckedCreateNestedManyWithoutItemInput> = z.object({
  create: z.union([ z.lazy(() => StockCreateWithoutItemInputSchema),z.lazy(() => StockCreateWithoutItemInputSchema).array(),z.lazy(() => StockUncheckedCreateWithoutItemInputSchema),z.lazy(() => StockUncheckedCreateWithoutItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StockCreateOrConnectWithoutItemInputSchema),z.lazy(() => StockCreateOrConnectWithoutItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StockCreateManyItemInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StockWhereUniqueInputSchema),z.lazy(() => StockWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UnidadMedidaUpdateOneWithoutItemNestedInputSchema: z.ZodType<Prisma.UnidadMedidaUpdateOneWithoutItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => UnidadMedidaCreateWithoutItemInputSchema),z.lazy(() => UnidadMedidaUncheckedCreateWithoutItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnidadMedidaCreateOrConnectWithoutItemInputSchema).optional(),
  upsert: z.lazy(() => UnidadMedidaUpsertWithoutItemInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UnidadMedidaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UnidadMedidaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UnidadMedidaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UnidadMedidaUpdateToOneWithWhereWithoutItemInputSchema),z.lazy(() => UnidadMedidaUpdateWithoutItemInputSchema),z.lazy(() => UnidadMedidaUncheckedUpdateWithoutItemInputSchema) ]).optional(),
}).strict();

export const UbicacionUpdateOneWithoutItemNestedInputSchema: z.ZodType<Prisma.UbicacionUpdateOneWithoutItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => UbicacionCreateWithoutItemInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UbicacionCreateOrConnectWithoutItemInputSchema).optional(),
  upsert: z.lazy(() => UbicacionUpsertWithoutItemInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UbicacionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UbicacionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UbicacionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UbicacionUpdateToOneWithWhereWithoutItemInputSchema),z.lazy(() => UbicacionUpdateWithoutItemInputSchema),z.lazy(() => UbicacionUncheckedUpdateWithoutItemInputSchema) ]).optional(),
}).strict();

export const ItemsOnPedidosUpdateManyWithoutItemsNestedInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateManyWithoutItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosCreateWithoutItemsInputSchema).array(),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutItemsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemsOnPedidosUpsertWithWhereUniqueWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUpsertWithWhereUniqueWithoutItemsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsOnPedidosCreateManyItemsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemsOnPedidosUpdateWithWhereUniqueWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUpdateWithWhereUniqueWithoutItemsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemsOnPedidosUpdateManyWithWhereWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUpdateManyWithWhereWithoutItemsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemsOnPedidosScalarWhereInputSchema),z.lazy(() => ItemsOnPedidosScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StockUpdateManyWithoutItemNestedInputSchema: z.ZodType<Prisma.StockUpdateManyWithoutItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => StockCreateWithoutItemInputSchema),z.lazy(() => StockCreateWithoutItemInputSchema).array(),z.lazy(() => StockUncheckedCreateWithoutItemInputSchema),z.lazy(() => StockUncheckedCreateWithoutItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StockCreateOrConnectWithoutItemInputSchema),z.lazy(() => StockCreateOrConnectWithoutItemInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StockUpsertWithWhereUniqueWithoutItemInputSchema),z.lazy(() => StockUpsertWithWhereUniqueWithoutItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StockCreateManyItemInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StockWhereUniqueInputSchema),z.lazy(() => StockWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StockWhereUniqueInputSchema),z.lazy(() => StockWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StockWhereUniqueInputSchema),z.lazy(() => StockWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StockWhereUniqueInputSchema),z.lazy(() => StockWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StockUpdateWithWhereUniqueWithoutItemInputSchema),z.lazy(() => StockUpdateWithWhereUniqueWithoutItemInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StockUpdateManyWithWhereWithoutItemInputSchema),z.lazy(() => StockUpdateManyWithWhereWithoutItemInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StockScalarWhereInputSchema),z.lazy(() => StockScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ItemsOnPedidosUncheckedUpdateManyWithoutItemsNestedInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedUpdateManyWithoutItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosCreateWithoutItemsInputSchema).array(),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutItemsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemsOnPedidosUpsertWithWhereUniqueWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUpsertWithWhereUniqueWithoutItemsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsOnPedidosCreateManyItemsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemsOnPedidosUpdateWithWhereUniqueWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUpdateWithWhereUniqueWithoutItemsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemsOnPedidosUpdateManyWithWhereWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUpdateManyWithWhereWithoutItemsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemsOnPedidosScalarWhereInputSchema),z.lazy(() => ItemsOnPedidosScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StockUncheckedUpdateManyWithoutItemNestedInputSchema: z.ZodType<Prisma.StockUncheckedUpdateManyWithoutItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => StockCreateWithoutItemInputSchema),z.lazy(() => StockCreateWithoutItemInputSchema).array(),z.lazy(() => StockUncheckedCreateWithoutItemInputSchema),z.lazy(() => StockUncheckedCreateWithoutItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StockCreateOrConnectWithoutItemInputSchema),z.lazy(() => StockCreateOrConnectWithoutItemInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StockUpsertWithWhereUniqueWithoutItemInputSchema),z.lazy(() => StockUpsertWithWhereUniqueWithoutItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StockCreateManyItemInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StockWhereUniqueInputSchema),z.lazy(() => StockWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StockWhereUniqueInputSchema),z.lazy(() => StockWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StockWhereUniqueInputSchema),z.lazy(() => StockWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StockWhereUniqueInputSchema),z.lazy(() => StockWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StockUpdateWithWhereUniqueWithoutItemInputSchema),z.lazy(() => StockUpdateWithWhereUniqueWithoutItemInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StockUpdateManyWithWhereWithoutItemInputSchema),z.lazy(() => StockUpdateManyWithWhereWithoutItemInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StockScalarWhereInputSchema),z.lazy(() => StockScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItemCreateNestedManyWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemCreateNestedManyWithoutUbicacionInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutUbicacionInputSchema),z.lazy(() => ItemCreateWithoutUbicacionInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutUbicacionInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUbicacionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutUbicacionInputSchema),z.lazy(() => ItemCreateOrConnectWithoutUbicacionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyUbicacionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UbicacionCreateNestedOneWithoutAlmacenInputSchema: z.ZodType<Prisma.UbicacionCreateNestedOneWithoutAlmacenInput> = z.object({
  create: z.union([ z.lazy(() => UbicacionCreateWithoutAlmacenInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutAlmacenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UbicacionCreateOrConnectWithoutAlmacenInputSchema).optional(),
  connect: z.lazy(() => UbicacionWhereUniqueInputSchema).optional()
}).strict();

export const UbicacionCreateNestedManyWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionCreateNestedManyWithoutSeccionInput> = z.object({
  create: z.union([ z.lazy(() => UbicacionCreateWithoutSeccionInputSchema),z.lazy(() => UbicacionCreateWithoutSeccionInputSchema).array(),z.lazy(() => UbicacionUncheckedCreateWithoutSeccionInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutSeccionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UbicacionCreateOrConnectWithoutSeccionInputSchema),z.lazy(() => UbicacionCreateOrConnectWithoutSeccionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UbicacionCreateManySeccionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UbicacionWhereUniqueInputSchema),z.lazy(() => UbicacionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItemUncheckedCreateNestedManyWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemUncheckedCreateNestedManyWithoutUbicacionInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutUbicacionInputSchema),z.lazy(() => ItemCreateWithoutUbicacionInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutUbicacionInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUbicacionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutUbicacionInputSchema),z.lazy(() => ItemCreateOrConnectWithoutUbicacionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyUbicacionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UbicacionUncheckedCreateNestedManyWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionUncheckedCreateNestedManyWithoutSeccionInput> = z.object({
  create: z.union([ z.lazy(() => UbicacionCreateWithoutSeccionInputSchema),z.lazy(() => UbicacionCreateWithoutSeccionInputSchema).array(),z.lazy(() => UbicacionUncheckedCreateWithoutSeccionInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutSeccionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UbicacionCreateOrConnectWithoutSeccionInputSchema),z.lazy(() => UbicacionCreateOrConnectWithoutSeccionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UbicacionCreateManySeccionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UbicacionWhereUniqueInputSchema),z.lazy(() => UbicacionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItemUpdateManyWithoutUbicacionNestedInputSchema: z.ZodType<Prisma.ItemUpdateManyWithoutUbicacionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutUbicacionInputSchema),z.lazy(() => ItemCreateWithoutUbicacionInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutUbicacionInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUbicacionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutUbicacionInputSchema),z.lazy(() => ItemCreateOrConnectWithoutUbicacionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemUpsertWithWhereUniqueWithoutUbicacionInputSchema),z.lazy(() => ItemUpsertWithWhereUniqueWithoutUbicacionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyUbicacionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemUpdateWithWhereUniqueWithoutUbicacionInputSchema),z.lazy(() => ItemUpdateWithWhereUniqueWithoutUbicacionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemUpdateManyWithWhereWithoutUbicacionInputSchema),z.lazy(() => ItemUpdateManyWithWhereWithoutUbicacionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemScalarWhereInputSchema),z.lazy(() => ItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UbicacionUpdateOneWithoutAlmacenNestedInputSchema: z.ZodType<Prisma.UbicacionUpdateOneWithoutAlmacenNestedInput> = z.object({
  create: z.union([ z.lazy(() => UbicacionCreateWithoutAlmacenInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutAlmacenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UbicacionCreateOrConnectWithoutAlmacenInputSchema).optional(),
  upsert: z.lazy(() => UbicacionUpsertWithoutAlmacenInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UbicacionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UbicacionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UbicacionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UbicacionUpdateToOneWithWhereWithoutAlmacenInputSchema),z.lazy(() => UbicacionUpdateWithoutAlmacenInputSchema),z.lazy(() => UbicacionUncheckedUpdateWithoutAlmacenInputSchema) ]).optional(),
}).strict();

export const UbicacionUpdateManyWithoutSeccionNestedInputSchema: z.ZodType<Prisma.UbicacionUpdateManyWithoutSeccionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UbicacionCreateWithoutSeccionInputSchema),z.lazy(() => UbicacionCreateWithoutSeccionInputSchema).array(),z.lazy(() => UbicacionUncheckedCreateWithoutSeccionInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutSeccionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UbicacionCreateOrConnectWithoutSeccionInputSchema),z.lazy(() => UbicacionCreateOrConnectWithoutSeccionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UbicacionUpsertWithWhereUniqueWithoutSeccionInputSchema),z.lazy(() => UbicacionUpsertWithWhereUniqueWithoutSeccionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UbicacionCreateManySeccionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UbicacionWhereUniqueInputSchema),z.lazy(() => UbicacionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UbicacionWhereUniqueInputSchema),z.lazy(() => UbicacionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UbicacionWhereUniqueInputSchema),z.lazy(() => UbicacionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UbicacionWhereUniqueInputSchema),z.lazy(() => UbicacionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UbicacionUpdateWithWhereUniqueWithoutSeccionInputSchema),z.lazy(() => UbicacionUpdateWithWhereUniqueWithoutSeccionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UbicacionUpdateManyWithWhereWithoutSeccionInputSchema),z.lazy(() => UbicacionUpdateManyWithWhereWithoutSeccionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UbicacionScalarWhereInputSchema),z.lazy(() => UbicacionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItemUncheckedUpdateManyWithoutUbicacionNestedInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateManyWithoutUbicacionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutUbicacionInputSchema),z.lazy(() => ItemCreateWithoutUbicacionInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutUbicacionInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUbicacionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutUbicacionInputSchema),z.lazy(() => ItemCreateOrConnectWithoutUbicacionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemUpsertWithWhereUniqueWithoutUbicacionInputSchema),z.lazy(() => ItemUpsertWithWhereUniqueWithoutUbicacionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyUbicacionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemUpdateWithWhereUniqueWithoutUbicacionInputSchema),z.lazy(() => ItemUpdateWithWhereUniqueWithoutUbicacionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemUpdateManyWithWhereWithoutUbicacionInputSchema),z.lazy(() => ItemUpdateManyWithWhereWithoutUbicacionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemScalarWhereInputSchema),z.lazy(() => ItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UbicacionUncheckedUpdateManyWithoutSeccionNestedInputSchema: z.ZodType<Prisma.UbicacionUncheckedUpdateManyWithoutSeccionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UbicacionCreateWithoutSeccionInputSchema),z.lazy(() => UbicacionCreateWithoutSeccionInputSchema).array(),z.lazy(() => UbicacionUncheckedCreateWithoutSeccionInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutSeccionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UbicacionCreateOrConnectWithoutSeccionInputSchema),z.lazy(() => UbicacionCreateOrConnectWithoutSeccionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UbicacionUpsertWithWhereUniqueWithoutSeccionInputSchema),z.lazy(() => UbicacionUpsertWithWhereUniqueWithoutSeccionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UbicacionCreateManySeccionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UbicacionWhereUniqueInputSchema),z.lazy(() => UbicacionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UbicacionWhereUniqueInputSchema),z.lazy(() => UbicacionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UbicacionWhereUniqueInputSchema),z.lazy(() => UbicacionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UbicacionWhereUniqueInputSchema),z.lazy(() => UbicacionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UbicacionUpdateWithWhereUniqueWithoutSeccionInputSchema),z.lazy(() => UbicacionUpdateWithWhereUniqueWithoutSeccionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UbicacionUpdateManyWithWhereWithoutSeccionInputSchema),z.lazy(() => UbicacionUpdateManyWithWhereWithoutSeccionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UbicacionScalarWhereInputSchema),z.lazy(() => UbicacionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItemCreateNestedOneWithoutStockInputSchema: z.ZodType<Prisma.ItemCreateNestedOneWithoutStockInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutStockInputSchema),z.lazy(() => ItemUncheckedCreateWithoutStockInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ItemCreateOrConnectWithoutStockInputSchema).optional(),
  connect: z.lazy(() => ItemWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const ItemUpdateOneRequiredWithoutStockNestedInputSchema: z.ZodType<Prisma.ItemUpdateOneRequiredWithoutStockNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutStockInputSchema),z.lazy(() => ItemUncheckedCreateWithoutStockInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ItemCreateOrConnectWithoutStockInputSchema).optional(),
  upsert: z.lazy(() => ItemUpsertWithoutStockInputSchema).optional(),
  connect: z.lazy(() => ItemWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ItemUpdateToOneWithWhereWithoutStockInputSchema),z.lazy(() => ItemUpdateWithoutStockInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutStockInputSchema) ]).optional(),
}).strict();

export const ItemCreateNestedManyWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemCreateNestedManyWithoutUnidadMedidaInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemCreateWithoutUnidadMedidaInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUnidadMedidaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutUnidadMedidaInputSchema),z.lazy(() => ItemCreateOrConnectWithoutUnidadMedidaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyUnidadMedidaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItemUncheckedCreateNestedManyWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemUncheckedCreateNestedManyWithoutUnidadMedidaInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemCreateWithoutUnidadMedidaInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUnidadMedidaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutUnidadMedidaInputSchema),z.lazy(() => ItemCreateOrConnectWithoutUnidadMedidaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyUnidadMedidaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItemUpdateManyWithoutUnidadMedidaNestedInputSchema: z.ZodType<Prisma.ItemUpdateManyWithoutUnidadMedidaNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemCreateWithoutUnidadMedidaInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUnidadMedidaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutUnidadMedidaInputSchema),z.lazy(() => ItemCreateOrConnectWithoutUnidadMedidaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemUpsertWithWhereUniqueWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUpsertWithWhereUniqueWithoutUnidadMedidaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyUnidadMedidaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemUpdateWithWhereUniqueWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUpdateWithWhereUniqueWithoutUnidadMedidaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemUpdateManyWithWhereWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUpdateManyWithWhereWithoutUnidadMedidaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemScalarWhereInputSchema),z.lazy(() => ItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItemUncheckedUpdateManyWithoutUnidadMedidaNestedInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateManyWithoutUnidadMedidaNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemCreateWithoutUnidadMedidaInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUnidadMedidaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutUnidadMedidaInputSchema),z.lazy(() => ItemCreateOrConnectWithoutUnidadMedidaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemUpsertWithWhereUniqueWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUpsertWithWhereUniqueWithoutUnidadMedidaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyUnidadMedidaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemUpdateWithWhereUniqueWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUpdateWithWhereUniqueWithoutUnidadMedidaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemUpdateManyWithWhereWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUpdateManyWithWhereWithoutUnidadMedidaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemScalarWhereInputSchema),z.lazy(() => ItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PedidoCreateNestedManyWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoCreateNestedManyWithoutProveedorInput> = z.object({
  create: z.union([ z.lazy(() => PedidoCreateWithoutProveedorInputSchema),z.lazy(() => PedidoCreateWithoutProveedorInputSchema).array(),z.lazy(() => PedidoUncheckedCreateWithoutProveedorInputSchema),z.lazy(() => PedidoUncheckedCreateWithoutProveedorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PedidoCreateOrConnectWithoutProveedorInputSchema),z.lazy(() => PedidoCreateOrConnectWithoutProveedorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PedidoCreateManyProveedorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PedidoWhereUniqueInputSchema),z.lazy(() => PedidoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PedidoUncheckedCreateNestedManyWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoUncheckedCreateNestedManyWithoutProveedorInput> = z.object({
  create: z.union([ z.lazy(() => PedidoCreateWithoutProveedorInputSchema),z.lazy(() => PedidoCreateWithoutProveedorInputSchema).array(),z.lazy(() => PedidoUncheckedCreateWithoutProveedorInputSchema),z.lazy(() => PedidoUncheckedCreateWithoutProveedorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PedidoCreateOrConnectWithoutProveedorInputSchema),z.lazy(() => PedidoCreateOrConnectWithoutProveedorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PedidoCreateManyProveedorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PedidoWhereUniqueInputSchema),z.lazy(() => PedidoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const PedidoUpdateManyWithoutProveedorNestedInputSchema: z.ZodType<Prisma.PedidoUpdateManyWithoutProveedorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PedidoCreateWithoutProveedorInputSchema),z.lazy(() => PedidoCreateWithoutProveedorInputSchema).array(),z.lazy(() => PedidoUncheckedCreateWithoutProveedorInputSchema),z.lazy(() => PedidoUncheckedCreateWithoutProveedorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PedidoCreateOrConnectWithoutProveedorInputSchema),z.lazy(() => PedidoCreateOrConnectWithoutProveedorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PedidoUpsertWithWhereUniqueWithoutProveedorInputSchema),z.lazy(() => PedidoUpsertWithWhereUniqueWithoutProveedorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PedidoCreateManyProveedorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PedidoWhereUniqueInputSchema),z.lazy(() => PedidoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PedidoWhereUniqueInputSchema),z.lazy(() => PedidoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PedidoWhereUniqueInputSchema),z.lazy(() => PedidoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PedidoWhereUniqueInputSchema),z.lazy(() => PedidoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PedidoUpdateWithWhereUniqueWithoutProveedorInputSchema),z.lazy(() => PedidoUpdateWithWhereUniqueWithoutProveedorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PedidoUpdateManyWithWhereWithoutProveedorInputSchema),z.lazy(() => PedidoUpdateManyWithWhereWithoutProveedorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PedidoScalarWhereInputSchema),z.lazy(() => PedidoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PedidoUncheckedUpdateManyWithoutProveedorNestedInputSchema: z.ZodType<Prisma.PedidoUncheckedUpdateManyWithoutProveedorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PedidoCreateWithoutProveedorInputSchema),z.lazy(() => PedidoCreateWithoutProveedorInputSchema).array(),z.lazy(() => PedidoUncheckedCreateWithoutProveedorInputSchema),z.lazy(() => PedidoUncheckedCreateWithoutProveedorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PedidoCreateOrConnectWithoutProveedorInputSchema),z.lazy(() => PedidoCreateOrConnectWithoutProveedorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PedidoUpsertWithWhereUniqueWithoutProveedorInputSchema),z.lazy(() => PedidoUpsertWithWhereUniqueWithoutProveedorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PedidoCreateManyProveedorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PedidoWhereUniqueInputSchema),z.lazy(() => PedidoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PedidoWhereUniqueInputSchema),z.lazy(() => PedidoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PedidoWhereUniqueInputSchema),z.lazy(() => PedidoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PedidoWhereUniqueInputSchema),z.lazy(() => PedidoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PedidoUpdateWithWhereUniqueWithoutProveedorInputSchema),z.lazy(() => PedidoUpdateWithWhereUniqueWithoutProveedorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PedidoUpdateManyWithWhereWithoutProveedorInputSchema),z.lazy(() => PedidoUpdateManyWithWhereWithoutProveedorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PedidoScalarWhereInputSchema),z.lazy(() => PedidoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItemsOnPedidosCreateNestedManyWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosCreateNestedManyWithoutPedidoInput> = z.object({
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosCreateWithoutPedidoInputSchema).array(),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutPedidoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsOnPedidosCreateManyPedidoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProveedorCreateNestedOneWithoutPedidoInputSchema: z.ZodType<Prisma.ProveedorCreateNestedOneWithoutPedidoInput> = z.object({
  create: z.union([ z.lazy(() => ProveedorCreateWithoutPedidoInputSchema),z.lazy(() => ProveedorUncheckedCreateWithoutPedidoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProveedorCreateOrConnectWithoutPedidoInputSchema).optional(),
  connect: z.lazy(() => ProveedorWhereUniqueInputSchema).optional()
}).strict();

export const ItemsOnPedidosUncheckedCreateNestedManyWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedCreateNestedManyWithoutPedidoInput> = z.object({
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosCreateWithoutPedidoInputSchema).array(),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutPedidoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsOnPedidosCreateManyPedidoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ItemsOnPedidosUpdateManyWithoutPedidoNestedInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateManyWithoutPedidoNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosCreateWithoutPedidoInputSchema).array(),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutPedidoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemsOnPedidosUpsertWithWhereUniqueWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUpsertWithWhereUniqueWithoutPedidoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsOnPedidosCreateManyPedidoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemsOnPedidosUpdateWithWhereUniqueWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUpdateWithWhereUniqueWithoutPedidoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemsOnPedidosUpdateManyWithWhereWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUpdateManyWithWhereWithoutPedidoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemsOnPedidosScalarWhereInputSchema),z.lazy(() => ItemsOnPedidosScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProveedorUpdateOneRequiredWithoutPedidoNestedInputSchema: z.ZodType<Prisma.ProveedorUpdateOneRequiredWithoutPedidoNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProveedorCreateWithoutPedidoInputSchema),z.lazy(() => ProveedorUncheckedCreateWithoutPedidoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProveedorCreateOrConnectWithoutPedidoInputSchema).optional(),
  upsert: z.lazy(() => ProveedorUpsertWithoutPedidoInputSchema).optional(),
  connect: z.lazy(() => ProveedorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProveedorUpdateToOneWithWhereWithoutPedidoInputSchema),z.lazy(() => ProveedorUpdateWithoutPedidoInputSchema),z.lazy(() => ProveedorUncheckedUpdateWithoutPedidoInputSchema) ]).optional(),
}).strict();

export const ItemsOnPedidosUncheckedUpdateManyWithoutPedidoNestedInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedUpdateManyWithoutPedidoNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosCreateWithoutPedidoInputSchema).array(),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosCreateOrConnectWithoutPedidoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemsOnPedidosUpsertWithWhereUniqueWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUpsertWithWhereUniqueWithoutPedidoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsOnPedidosCreateManyPedidoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemsOnPedidosUpdateWithWhereUniqueWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUpdateWithWhereUniqueWithoutPedidoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemsOnPedidosUpdateManyWithWhereWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUpdateManyWithWhereWithoutPedidoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemsOnPedidosScalarWhereInputSchema),z.lazy(() => ItemsOnPedidosScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItemCreateNestedOneWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.ItemCreateNestedOneWithoutItemsOnPedidosInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutItemsOnPedidosInputSchema),z.lazy(() => ItemUncheckedCreateWithoutItemsOnPedidosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ItemCreateOrConnectWithoutItemsOnPedidosInputSchema).optional(),
  connect: z.lazy(() => ItemWhereUniqueInputSchema).optional()
}).strict();

export const PedidoCreateNestedOneWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.PedidoCreateNestedOneWithoutItemsOnPedidosInput> = z.object({
  create: z.union([ z.lazy(() => PedidoCreateWithoutItemsOnPedidosInputSchema),z.lazy(() => PedidoUncheckedCreateWithoutItemsOnPedidosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PedidoCreateOrConnectWithoutItemsOnPedidosInputSchema).optional(),
  connect: z.lazy(() => PedidoWhereUniqueInputSchema).optional()
}).strict();

export const ItemUpdateOneRequiredWithoutItemsOnPedidosNestedInputSchema: z.ZodType<Prisma.ItemUpdateOneRequiredWithoutItemsOnPedidosNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutItemsOnPedidosInputSchema),z.lazy(() => ItemUncheckedCreateWithoutItemsOnPedidosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ItemCreateOrConnectWithoutItemsOnPedidosInputSchema).optional(),
  upsert: z.lazy(() => ItemUpsertWithoutItemsOnPedidosInputSchema).optional(),
  connect: z.lazy(() => ItemWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ItemUpdateToOneWithWhereWithoutItemsOnPedidosInputSchema),z.lazy(() => ItemUpdateWithoutItemsOnPedidosInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutItemsOnPedidosInputSchema) ]).optional(),
}).strict();

export const PedidoUpdateOneRequiredWithoutItemsOnPedidosNestedInputSchema: z.ZodType<Prisma.PedidoUpdateOneRequiredWithoutItemsOnPedidosNestedInput> = z.object({
  create: z.union([ z.lazy(() => PedidoCreateWithoutItemsOnPedidosInputSchema),z.lazy(() => PedidoUncheckedCreateWithoutItemsOnPedidosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PedidoCreateOrConnectWithoutItemsOnPedidosInputSchema).optional(),
  upsert: z.lazy(() => PedidoUpsertWithoutItemsOnPedidosInputSchema).optional(),
  connect: z.lazy(() => PedidoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PedidoUpdateToOneWithWhereWithoutItemsOnPedidosInputSchema),z.lazy(() => PedidoUpdateWithoutItemsOnPedidosInputSchema),z.lazy(() => PedidoUncheckedUpdateWithoutItemsOnPedidosInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const UnidadMedidaCreateWithoutItemInputSchema: z.ZodType<Prisma.UnidadMedidaCreateWithoutItemInput> = z.object({
  descripcion: z.string(),
  corto: z.string()
}).strict();

export const UnidadMedidaUncheckedCreateWithoutItemInputSchema: z.ZodType<Prisma.UnidadMedidaUncheckedCreateWithoutItemInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  corto: z.string()
}).strict();

export const UnidadMedidaCreateOrConnectWithoutItemInputSchema: z.ZodType<Prisma.UnidadMedidaCreateOrConnectWithoutItemInput> = z.object({
  where: z.lazy(() => UnidadMedidaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UnidadMedidaCreateWithoutItemInputSchema),z.lazy(() => UnidadMedidaUncheckedCreateWithoutItemInputSchema) ]),
}).strict();

export const UbicacionCreateWithoutItemInputSchema: z.ZodType<Prisma.UbicacionCreateWithoutItemInput> = z.object({
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean().optional(),
  seccion: z.lazy(() => UbicacionCreateNestedOneWithoutAlmacenInputSchema).optional(),
  almacen: z.lazy(() => UbicacionCreateNestedManyWithoutSeccionInputSchema).optional()
}).strict();

export const UbicacionUncheckedCreateWithoutItemInputSchema: z.ZodType<Prisma.UbicacionUncheckedCreateWithoutItemInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean().optional(),
  ubicacionId: z.number().int().optional().nullable(),
  almacen: z.lazy(() => UbicacionUncheckedCreateNestedManyWithoutSeccionInputSchema).optional()
}).strict();

export const UbicacionCreateOrConnectWithoutItemInputSchema: z.ZodType<Prisma.UbicacionCreateOrConnectWithoutItemInput> = z.object({
  where: z.lazy(() => UbicacionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UbicacionCreateWithoutItemInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutItemInputSchema) ]),
}).strict();

export const ItemsOnPedidosCreateWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosCreateWithoutItemsInput> = z.object({
  cant: z.number().int(),
  precio: z.number(),
  asignado: z.coerce.date().optional(),
  pedido: z.lazy(() => PedidoCreateNestedOneWithoutItemsOnPedidosInputSchema)
}).strict();

export const ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedCreateWithoutItemsInput> = z.object({
  pedidoId: z.number().int(),
  cant: z.number().int(),
  precio: z.number(),
  asignado: z.coerce.date().optional()
}).strict();

export const ItemsOnPedidosCreateOrConnectWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosCreateOrConnectWithoutItemsInput> = z.object({
  where: z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema) ]),
}).strict();

export const ItemsOnPedidosCreateManyItemsInputEnvelopeSchema: z.ZodType<Prisma.ItemsOnPedidosCreateManyItemsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ItemsOnPedidosCreateManyItemsInputSchema),z.lazy(() => ItemsOnPedidosCreateManyItemsInputSchema).array() ]),
}).strict();

export const StockCreateWithoutItemInputSchema: z.ZodType<Prisma.StockCreateWithoutItemInput> = z.object({
  fecha: z.coerce.date().optional(),
  descripcion: z.string(),
  cant: z.number().int()
}).strict();

export const StockUncheckedCreateWithoutItemInputSchema: z.ZodType<Prisma.StockUncheckedCreateWithoutItemInput> = z.object({
  id: z.number().int().optional(),
  fecha: z.coerce.date().optional(),
  descripcion: z.string(),
  cant: z.number().int()
}).strict();

export const StockCreateOrConnectWithoutItemInputSchema: z.ZodType<Prisma.StockCreateOrConnectWithoutItemInput> = z.object({
  where: z.lazy(() => StockWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StockCreateWithoutItemInputSchema),z.lazy(() => StockUncheckedCreateWithoutItemInputSchema) ]),
}).strict();

export const StockCreateManyItemInputEnvelopeSchema: z.ZodType<Prisma.StockCreateManyItemInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StockCreateManyItemInputSchema),z.lazy(() => StockCreateManyItemInputSchema).array() ]),
}).strict();

export const UnidadMedidaUpsertWithoutItemInputSchema: z.ZodType<Prisma.UnidadMedidaUpsertWithoutItemInput> = z.object({
  update: z.union([ z.lazy(() => UnidadMedidaUpdateWithoutItemInputSchema),z.lazy(() => UnidadMedidaUncheckedUpdateWithoutItemInputSchema) ]),
  create: z.union([ z.lazy(() => UnidadMedidaCreateWithoutItemInputSchema),z.lazy(() => UnidadMedidaUncheckedCreateWithoutItemInputSchema) ]),
  where: z.lazy(() => UnidadMedidaWhereInputSchema).optional()
}).strict();

export const UnidadMedidaUpdateToOneWithWhereWithoutItemInputSchema: z.ZodType<Prisma.UnidadMedidaUpdateToOneWithWhereWithoutItemInput> = z.object({
  where: z.lazy(() => UnidadMedidaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UnidadMedidaUpdateWithoutItemInputSchema),z.lazy(() => UnidadMedidaUncheckedUpdateWithoutItemInputSchema) ]),
}).strict();

export const UnidadMedidaUpdateWithoutItemInputSchema: z.ZodType<Prisma.UnidadMedidaUpdateWithoutItemInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnidadMedidaUncheckedUpdateWithoutItemInputSchema: z.ZodType<Prisma.UnidadMedidaUncheckedUpdateWithoutItemInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UbicacionUpsertWithoutItemInputSchema: z.ZodType<Prisma.UbicacionUpsertWithoutItemInput> = z.object({
  update: z.union([ z.lazy(() => UbicacionUpdateWithoutItemInputSchema),z.lazy(() => UbicacionUncheckedUpdateWithoutItemInputSchema) ]),
  create: z.union([ z.lazy(() => UbicacionCreateWithoutItemInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutItemInputSchema) ]),
  where: z.lazy(() => UbicacionWhereInputSchema).optional()
}).strict();

export const UbicacionUpdateToOneWithWhereWithoutItemInputSchema: z.ZodType<Prisma.UbicacionUpdateToOneWithWhereWithoutItemInput> = z.object({
  where: z.lazy(() => UbicacionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UbicacionUpdateWithoutItemInputSchema),z.lazy(() => UbicacionUncheckedUpdateWithoutItemInputSchema) ]),
}).strict();

export const UbicacionUpdateWithoutItemInputSchema: z.ZodType<Prisma.UbicacionUpdateWithoutItemInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  seccion: z.lazy(() => UbicacionUpdateOneWithoutAlmacenNestedInputSchema).optional(),
  almacen: z.lazy(() => UbicacionUpdateManyWithoutSeccionNestedInputSchema).optional()
}).strict();

export const UbicacionUncheckedUpdateWithoutItemInputSchema: z.ZodType<Prisma.UbicacionUncheckedUpdateWithoutItemInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ubicacionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  almacen: z.lazy(() => UbicacionUncheckedUpdateManyWithoutSeccionNestedInputSchema).optional()
}).strict();

export const ItemsOnPedidosUpsertWithWhereUniqueWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpsertWithWhereUniqueWithoutItemsInput> = z.object({
  where: z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ItemsOnPedidosUpdateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUncheckedUpdateWithoutItemsInputSchema) ]),
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutItemsInputSchema) ]),
}).strict();

export const ItemsOnPedidosUpdateWithWhereUniqueWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateWithWhereUniqueWithoutItemsInput> = z.object({
  where: z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ItemsOnPedidosUpdateWithoutItemsInputSchema),z.lazy(() => ItemsOnPedidosUncheckedUpdateWithoutItemsInputSchema) ]),
}).strict();

export const ItemsOnPedidosUpdateManyWithWhereWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateManyWithWhereWithoutItemsInput> = z.object({
  where: z.lazy(() => ItemsOnPedidosScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ItemsOnPedidosUpdateManyMutationInputSchema),z.lazy(() => ItemsOnPedidosUncheckedUpdateManyWithoutItemsInputSchema) ]),
}).strict();

export const ItemsOnPedidosScalarWhereInputSchema: z.ZodType<Prisma.ItemsOnPedidosScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemsOnPedidosScalarWhereInputSchema),z.lazy(() => ItemsOnPedidosScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsOnPedidosScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsOnPedidosScalarWhereInputSchema),z.lazy(() => ItemsOnPedidosScalarWhereInputSchema).array() ]).optional(),
  pedidoId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  itemId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cant: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  precio: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  asignado: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const StockUpsertWithWhereUniqueWithoutItemInputSchema: z.ZodType<Prisma.StockUpsertWithWhereUniqueWithoutItemInput> = z.object({
  where: z.lazy(() => StockWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StockUpdateWithoutItemInputSchema),z.lazy(() => StockUncheckedUpdateWithoutItemInputSchema) ]),
  create: z.union([ z.lazy(() => StockCreateWithoutItemInputSchema),z.lazy(() => StockUncheckedCreateWithoutItemInputSchema) ]),
}).strict();

export const StockUpdateWithWhereUniqueWithoutItemInputSchema: z.ZodType<Prisma.StockUpdateWithWhereUniqueWithoutItemInput> = z.object({
  where: z.lazy(() => StockWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StockUpdateWithoutItemInputSchema),z.lazy(() => StockUncheckedUpdateWithoutItemInputSchema) ]),
}).strict();

export const StockUpdateManyWithWhereWithoutItemInputSchema: z.ZodType<Prisma.StockUpdateManyWithWhereWithoutItemInput> = z.object({
  where: z.lazy(() => StockScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StockUpdateManyMutationInputSchema),z.lazy(() => StockUncheckedUpdateManyWithoutItemInputSchema) ]),
}).strict();

export const StockScalarWhereInputSchema: z.ZodType<Prisma.StockScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StockScalarWhereInputSchema),z.lazy(() => StockScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StockScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StockScalarWhereInputSchema),z.lazy(() => StockScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fecha: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cant: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  itemId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ItemCreateWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemCreateWithoutUbicacionInput> = z.object({
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  unidadMedida: z.lazy(() => UnidadMedidaCreateNestedOneWithoutItemInputSchema).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosCreateNestedManyWithoutItemsInputSchema).optional(),
  stock: z.lazy(() => StockCreateNestedManyWithoutItemInputSchema).optional()
}).strict();

export const ItemUncheckedCreateWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemUncheckedCreateWithoutUbicacionInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  unidadMedidaId: z.number().int().optional().nullable(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedCreateNestedManyWithoutItemsInputSchema).optional(),
  stock: z.lazy(() => StockUncheckedCreateNestedManyWithoutItemInputSchema).optional()
}).strict();

export const ItemCreateOrConnectWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemCreateOrConnectWithoutUbicacionInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItemCreateWithoutUbicacionInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUbicacionInputSchema) ]),
}).strict();

export const ItemCreateManyUbicacionInputEnvelopeSchema: z.ZodType<Prisma.ItemCreateManyUbicacionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ItemCreateManyUbicacionInputSchema),z.lazy(() => ItemCreateManyUbicacionInputSchema).array() ]),
}).strict();

export const UbicacionCreateWithoutAlmacenInputSchema: z.ZodType<Prisma.UbicacionCreateWithoutAlmacenInput> = z.object({
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean().optional(),
  item: z.lazy(() => ItemCreateNestedManyWithoutUbicacionInputSchema).optional(),
  seccion: z.lazy(() => UbicacionCreateNestedOneWithoutAlmacenInputSchema).optional()
}).strict();

export const UbicacionUncheckedCreateWithoutAlmacenInputSchema: z.ZodType<Prisma.UbicacionUncheckedCreateWithoutAlmacenInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean().optional(),
  ubicacionId: z.number().int().optional().nullable(),
  item: z.lazy(() => ItemUncheckedCreateNestedManyWithoutUbicacionInputSchema).optional()
}).strict();

export const UbicacionCreateOrConnectWithoutAlmacenInputSchema: z.ZodType<Prisma.UbicacionCreateOrConnectWithoutAlmacenInput> = z.object({
  where: z.lazy(() => UbicacionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UbicacionCreateWithoutAlmacenInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutAlmacenInputSchema) ]),
}).strict();

export const UbicacionCreateWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionCreateWithoutSeccionInput> = z.object({
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean().optional(),
  item: z.lazy(() => ItemCreateNestedManyWithoutUbicacionInputSchema).optional(),
  almacen: z.lazy(() => UbicacionCreateNestedManyWithoutSeccionInputSchema).optional()
}).strict();

export const UbicacionUncheckedCreateWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionUncheckedCreateWithoutSeccionInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean().optional(),
  item: z.lazy(() => ItemUncheckedCreateNestedManyWithoutUbicacionInputSchema).optional(),
  almacen: z.lazy(() => UbicacionUncheckedCreateNestedManyWithoutSeccionInputSchema).optional()
}).strict();

export const UbicacionCreateOrConnectWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionCreateOrConnectWithoutSeccionInput> = z.object({
  where: z.lazy(() => UbicacionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UbicacionCreateWithoutSeccionInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutSeccionInputSchema) ]),
}).strict();

export const UbicacionCreateManySeccionInputEnvelopeSchema: z.ZodType<Prisma.UbicacionCreateManySeccionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UbicacionCreateManySeccionInputSchema),z.lazy(() => UbicacionCreateManySeccionInputSchema).array() ]),
}).strict();

export const ItemUpsertWithWhereUniqueWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemUpsertWithWhereUniqueWithoutUbicacionInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ItemUpdateWithoutUbicacionInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutUbicacionInputSchema) ]),
  create: z.union([ z.lazy(() => ItemCreateWithoutUbicacionInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUbicacionInputSchema) ]),
}).strict();

export const ItemUpdateWithWhereUniqueWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemUpdateWithWhereUniqueWithoutUbicacionInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ItemUpdateWithoutUbicacionInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutUbicacionInputSchema) ]),
}).strict();

export const ItemUpdateManyWithWhereWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemUpdateManyWithWhereWithoutUbicacionInput> = z.object({
  where: z.lazy(() => ItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ItemUpdateManyMutationInputSchema),z.lazy(() => ItemUncheckedUpdateManyWithoutUbicacionInputSchema) ]),
}).strict();

export const ItemScalarWhereInputSchema: z.ZodType<Prisma.ItemScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemScalarWhereInputSchema),z.lazy(() => ItemScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemScalarWhereInputSchema),z.lazy(() => ItemScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activo: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  stockMin: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  stockMax: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  precio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ubicacionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  unidadMedidaId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const UbicacionUpsertWithoutAlmacenInputSchema: z.ZodType<Prisma.UbicacionUpsertWithoutAlmacenInput> = z.object({
  update: z.union([ z.lazy(() => UbicacionUpdateWithoutAlmacenInputSchema),z.lazy(() => UbicacionUncheckedUpdateWithoutAlmacenInputSchema) ]),
  create: z.union([ z.lazy(() => UbicacionCreateWithoutAlmacenInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutAlmacenInputSchema) ]),
  where: z.lazy(() => UbicacionWhereInputSchema).optional()
}).strict();

export const UbicacionUpdateToOneWithWhereWithoutAlmacenInputSchema: z.ZodType<Prisma.UbicacionUpdateToOneWithWhereWithoutAlmacenInput> = z.object({
  where: z.lazy(() => UbicacionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UbicacionUpdateWithoutAlmacenInputSchema),z.lazy(() => UbicacionUncheckedUpdateWithoutAlmacenInputSchema) ]),
}).strict();

export const UbicacionUpdateWithoutAlmacenInputSchema: z.ZodType<Prisma.UbicacionUpdateWithoutAlmacenInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  item: z.lazy(() => ItemUpdateManyWithoutUbicacionNestedInputSchema).optional(),
  seccion: z.lazy(() => UbicacionUpdateOneWithoutAlmacenNestedInputSchema).optional()
}).strict();

export const UbicacionUncheckedUpdateWithoutAlmacenInputSchema: z.ZodType<Prisma.UbicacionUncheckedUpdateWithoutAlmacenInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ubicacionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  item: z.lazy(() => ItemUncheckedUpdateManyWithoutUbicacionNestedInputSchema).optional()
}).strict();

export const UbicacionUpsertWithWhereUniqueWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionUpsertWithWhereUniqueWithoutSeccionInput> = z.object({
  where: z.lazy(() => UbicacionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UbicacionUpdateWithoutSeccionInputSchema),z.lazy(() => UbicacionUncheckedUpdateWithoutSeccionInputSchema) ]),
  create: z.union([ z.lazy(() => UbicacionCreateWithoutSeccionInputSchema),z.lazy(() => UbicacionUncheckedCreateWithoutSeccionInputSchema) ]),
}).strict();

export const UbicacionUpdateWithWhereUniqueWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionUpdateWithWhereUniqueWithoutSeccionInput> = z.object({
  where: z.lazy(() => UbicacionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UbicacionUpdateWithoutSeccionInputSchema),z.lazy(() => UbicacionUncheckedUpdateWithoutSeccionInputSchema) ]),
}).strict();

export const UbicacionUpdateManyWithWhereWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionUpdateManyWithWhereWithoutSeccionInput> = z.object({
  where: z.lazy(() => UbicacionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UbicacionUpdateManyMutationInputSchema),z.lazy(() => UbicacionUncheckedUpdateManyWithoutSeccionInputSchema) ]),
}).strict();

export const UbicacionScalarWhereInputSchema: z.ZodType<Prisma.UbicacionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UbicacionScalarWhereInputSchema),z.lazy(() => UbicacionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UbicacionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UbicacionScalarWhereInputSchema),z.lazy(() => UbicacionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  descripcion: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  corto: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isAlmacen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ubicacionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ItemCreateWithoutStockInputSchema: z.ZodType<Prisma.ItemCreateWithoutStockInput> = z.object({
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  unidadMedida: z.lazy(() => UnidadMedidaCreateNestedOneWithoutItemInputSchema).optional(),
  ubicacion: z.lazy(() => UbicacionCreateNestedOneWithoutItemInputSchema).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosCreateNestedManyWithoutItemsInputSchema).optional()
}).strict();

export const ItemUncheckedCreateWithoutStockInputSchema: z.ZodType<Prisma.ItemUncheckedCreateWithoutStockInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  ubicacionId: z.number().int().optional().nullable(),
  unidadMedidaId: z.number().int().optional().nullable(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedCreateNestedManyWithoutItemsInputSchema).optional()
}).strict();

export const ItemCreateOrConnectWithoutStockInputSchema: z.ZodType<Prisma.ItemCreateOrConnectWithoutStockInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItemCreateWithoutStockInputSchema),z.lazy(() => ItemUncheckedCreateWithoutStockInputSchema) ]),
}).strict();

export const ItemUpsertWithoutStockInputSchema: z.ZodType<Prisma.ItemUpsertWithoutStockInput> = z.object({
  update: z.union([ z.lazy(() => ItemUpdateWithoutStockInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutStockInputSchema) ]),
  create: z.union([ z.lazy(() => ItemCreateWithoutStockInputSchema),z.lazy(() => ItemUncheckedCreateWithoutStockInputSchema) ]),
  where: z.lazy(() => ItemWhereInputSchema).optional()
}).strict();

export const ItemUpdateToOneWithWhereWithoutStockInputSchema: z.ZodType<Prisma.ItemUpdateToOneWithWhereWithoutStockInput> = z.object({
  where: z.lazy(() => ItemWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ItemUpdateWithoutStockInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutStockInputSchema) ]),
}).strict();

export const ItemUpdateWithoutStockInputSchema: z.ZodType<Prisma.ItemUpdateWithoutStockInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unidadMedida: z.lazy(() => UnidadMedidaUpdateOneWithoutItemNestedInputSchema).optional(),
  ubicacion: z.lazy(() => UbicacionUpdateOneWithoutItemNestedInputSchema).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUpdateManyWithoutItemsNestedInputSchema).optional()
}).strict();

export const ItemUncheckedUpdateWithoutStockInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateWithoutStockInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ubicacionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unidadMedidaId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedUpdateManyWithoutItemsNestedInputSchema).optional()
}).strict();

export const ItemCreateWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemCreateWithoutUnidadMedidaInput> = z.object({
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  ubicacion: z.lazy(() => UbicacionCreateNestedOneWithoutItemInputSchema).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosCreateNestedManyWithoutItemsInputSchema).optional(),
  stock: z.lazy(() => StockCreateNestedManyWithoutItemInputSchema).optional()
}).strict();

export const ItemUncheckedCreateWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemUncheckedCreateWithoutUnidadMedidaInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  ubicacionId: z.number().int().optional().nullable(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedCreateNestedManyWithoutItemsInputSchema).optional(),
  stock: z.lazy(() => StockUncheckedCreateNestedManyWithoutItemInputSchema).optional()
}).strict();

export const ItemCreateOrConnectWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemCreateOrConnectWithoutUnidadMedidaInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItemCreateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUnidadMedidaInputSchema) ]),
}).strict();

export const ItemCreateManyUnidadMedidaInputEnvelopeSchema: z.ZodType<Prisma.ItemCreateManyUnidadMedidaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ItemCreateManyUnidadMedidaInputSchema),z.lazy(() => ItemCreateManyUnidadMedidaInputSchema).array() ]),
}).strict();

export const ItemUpsertWithWhereUniqueWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemUpsertWithWhereUniqueWithoutUnidadMedidaInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ItemUpdateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutUnidadMedidaInputSchema) ]),
  create: z.union([ z.lazy(() => ItemCreateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUncheckedCreateWithoutUnidadMedidaInputSchema) ]),
}).strict();

export const ItemUpdateWithWhereUniqueWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemUpdateWithWhereUniqueWithoutUnidadMedidaInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ItemUpdateWithoutUnidadMedidaInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutUnidadMedidaInputSchema) ]),
}).strict();

export const ItemUpdateManyWithWhereWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemUpdateManyWithWhereWithoutUnidadMedidaInput> = z.object({
  where: z.lazy(() => ItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ItemUpdateManyMutationInputSchema),z.lazy(() => ItemUncheckedUpdateManyWithoutUnidadMedidaInputSchema) ]),
}).strict();

export const PedidoCreateWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoCreateWithoutProveedorInput> = z.object({
  creado: z.coerce.date(),
  subTotal: z.number(),
  totalImpuestos: z.number(),
  total: z.number(),
  fechaPrevista: z.coerce.date(),
  fechaEntrega: z.coerce.date(),
  pagado: z.boolean(),
  entregado: z.boolean(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosCreateNestedManyWithoutPedidoInputSchema).optional()
}).strict();

export const PedidoUncheckedCreateWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoUncheckedCreateWithoutProveedorInput> = z.object({
  id: z.number().int().optional(),
  creado: z.coerce.date(),
  subTotal: z.number(),
  totalImpuestos: z.number(),
  total: z.number(),
  fechaPrevista: z.coerce.date(),
  fechaEntrega: z.coerce.date(),
  pagado: z.boolean(),
  entregado: z.boolean(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedCreateNestedManyWithoutPedidoInputSchema).optional()
}).strict();

export const PedidoCreateOrConnectWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoCreateOrConnectWithoutProveedorInput> = z.object({
  where: z.lazy(() => PedidoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PedidoCreateWithoutProveedorInputSchema),z.lazy(() => PedidoUncheckedCreateWithoutProveedorInputSchema) ]),
}).strict();

export const PedidoCreateManyProveedorInputEnvelopeSchema: z.ZodType<Prisma.PedidoCreateManyProveedorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PedidoCreateManyProveedorInputSchema),z.lazy(() => PedidoCreateManyProveedorInputSchema).array() ]),
}).strict();

export const PedidoUpsertWithWhereUniqueWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoUpsertWithWhereUniqueWithoutProveedorInput> = z.object({
  where: z.lazy(() => PedidoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PedidoUpdateWithoutProveedorInputSchema),z.lazy(() => PedidoUncheckedUpdateWithoutProveedorInputSchema) ]),
  create: z.union([ z.lazy(() => PedidoCreateWithoutProveedorInputSchema),z.lazy(() => PedidoUncheckedCreateWithoutProveedorInputSchema) ]),
}).strict();

export const PedidoUpdateWithWhereUniqueWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoUpdateWithWhereUniqueWithoutProveedorInput> = z.object({
  where: z.lazy(() => PedidoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PedidoUpdateWithoutProveedorInputSchema),z.lazy(() => PedidoUncheckedUpdateWithoutProveedorInputSchema) ]),
}).strict();

export const PedidoUpdateManyWithWhereWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoUpdateManyWithWhereWithoutProveedorInput> = z.object({
  where: z.lazy(() => PedidoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PedidoUpdateManyMutationInputSchema),z.lazy(() => PedidoUncheckedUpdateManyWithoutProveedorInputSchema) ]),
}).strict();

export const PedidoScalarWhereInputSchema: z.ZodType<Prisma.PedidoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PedidoScalarWhereInputSchema),z.lazy(() => PedidoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PedidoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PedidoScalarWhereInputSchema),z.lazy(() => PedidoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  proveedorId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  creado: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  subTotal: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalImpuestos: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  total: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  fechaPrevista: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fechaEntrega: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pagado: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  entregado: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const ItemsOnPedidosCreateWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosCreateWithoutPedidoInput> = z.object({
  cant: z.number().int(),
  precio: z.number(),
  asignado: z.coerce.date().optional(),
  items: z.lazy(() => ItemCreateNestedOneWithoutItemsOnPedidosInputSchema)
}).strict();

export const ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedCreateWithoutPedidoInput> = z.object({
  itemId: z.number().int(),
  cant: z.number().int(),
  precio: z.number(),
  asignado: z.coerce.date().optional()
}).strict();

export const ItemsOnPedidosCreateOrConnectWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosCreateOrConnectWithoutPedidoInput> = z.object({
  where: z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema) ]),
}).strict();

export const ItemsOnPedidosCreateManyPedidoInputEnvelopeSchema: z.ZodType<Prisma.ItemsOnPedidosCreateManyPedidoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ItemsOnPedidosCreateManyPedidoInputSchema),z.lazy(() => ItemsOnPedidosCreateManyPedidoInputSchema).array() ]),
}).strict();

export const ProveedorCreateWithoutPedidoInputSchema: z.ZodType<Prisma.ProveedorCreateWithoutPedidoInput> = z.object({
  nombre: z.string(),
  razonSocial: z.string(),
  idFiscal: z.string(),
  direccion: z.string(),
  correo: z.string(),
  telefono: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  observaciones: z.string().optional().nullable(),
  activo: z.boolean().optional()
}).strict();

export const ProveedorUncheckedCreateWithoutPedidoInputSchema: z.ZodType<Prisma.ProveedorUncheckedCreateWithoutPedidoInput> = z.object({
  id: z.number().int().optional(),
  nombre: z.string(),
  razonSocial: z.string(),
  idFiscal: z.string(),
  direccion: z.string(),
  correo: z.string(),
  telefono: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  observaciones: z.string().optional().nullable(),
  activo: z.boolean().optional()
}).strict();

export const ProveedorCreateOrConnectWithoutPedidoInputSchema: z.ZodType<Prisma.ProveedorCreateOrConnectWithoutPedidoInput> = z.object({
  where: z.lazy(() => ProveedorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProveedorCreateWithoutPedidoInputSchema),z.lazy(() => ProveedorUncheckedCreateWithoutPedidoInputSchema) ]),
}).strict();

export const ItemsOnPedidosUpsertWithWhereUniqueWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpsertWithWhereUniqueWithoutPedidoInput> = z.object({
  where: z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ItemsOnPedidosUpdateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUncheckedUpdateWithoutPedidoInputSchema) ]),
  create: z.union([ z.lazy(() => ItemsOnPedidosCreateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUncheckedCreateWithoutPedidoInputSchema) ]),
}).strict();

export const ItemsOnPedidosUpdateWithWhereUniqueWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateWithWhereUniqueWithoutPedidoInput> = z.object({
  where: z.lazy(() => ItemsOnPedidosWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ItemsOnPedidosUpdateWithoutPedidoInputSchema),z.lazy(() => ItemsOnPedidosUncheckedUpdateWithoutPedidoInputSchema) ]),
}).strict();

export const ItemsOnPedidosUpdateManyWithWhereWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateManyWithWhereWithoutPedidoInput> = z.object({
  where: z.lazy(() => ItemsOnPedidosScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ItemsOnPedidosUpdateManyMutationInputSchema),z.lazy(() => ItemsOnPedidosUncheckedUpdateManyWithoutPedidoInputSchema) ]),
}).strict();

export const ProveedorUpsertWithoutPedidoInputSchema: z.ZodType<Prisma.ProveedorUpsertWithoutPedidoInput> = z.object({
  update: z.union([ z.lazy(() => ProveedorUpdateWithoutPedidoInputSchema),z.lazy(() => ProveedorUncheckedUpdateWithoutPedidoInputSchema) ]),
  create: z.union([ z.lazy(() => ProveedorCreateWithoutPedidoInputSchema),z.lazy(() => ProveedorUncheckedCreateWithoutPedidoInputSchema) ]),
  where: z.lazy(() => ProveedorWhereInputSchema).optional()
}).strict();

export const ProveedorUpdateToOneWithWhereWithoutPedidoInputSchema: z.ZodType<Prisma.ProveedorUpdateToOneWithWhereWithoutPedidoInput> = z.object({
  where: z.lazy(() => ProveedorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProveedorUpdateWithoutPedidoInputSchema),z.lazy(() => ProveedorUncheckedUpdateWithoutPedidoInputSchema) ]),
}).strict();

export const ProveedorUpdateWithoutPedidoInputSchema: z.ZodType<Prisma.ProveedorUpdateWithoutPedidoInput> = z.object({
  nombre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  razonSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idFiscal: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direccion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  correo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefono: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observaciones: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProveedorUncheckedUpdateWithoutPedidoInputSchema: z.ZodType<Prisma.ProveedorUncheckedUpdateWithoutPedidoInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nombre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  razonSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idFiscal: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direccion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  correo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telefono: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observaciones: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemCreateWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.ItemCreateWithoutItemsOnPedidosInput> = z.object({
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  unidadMedida: z.lazy(() => UnidadMedidaCreateNestedOneWithoutItemInputSchema).optional(),
  ubicacion: z.lazy(() => UbicacionCreateNestedOneWithoutItemInputSchema).optional(),
  stock: z.lazy(() => StockCreateNestedManyWithoutItemInputSchema).optional()
}).strict();

export const ItemUncheckedCreateWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.ItemUncheckedCreateWithoutItemsOnPedidosInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  ubicacionId: z.number().int().optional().nullable(),
  unidadMedidaId: z.number().int().optional().nullable(),
  stock: z.lazy(() => StockUncheckedCreateNestedManyWithoutItemInputSchema).optional()
}).strict();

export const ItemCreateOrConnectWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.ItemCreateOrConnectWithoutItemsOnPedidosInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItemCreateWithoutItemsOnPedidosInputSchema),z.lazy(() => ItemUncheckedCreateWithoutItemsOnPedidosInputSchema) ]),
}).strict();

export const PedidoCreateWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.PedidoCreateWithoutItemsOnPedidosInput> = z.object({
  creado: z.coerce.date(),
  subTotal: z.number(),
  totalImpuestos: z.number(),
  total: z.number(),
  fechaPrevista: z.coerce.date(),
  fechaEntrega: z.coerce.date(),
  pagado: z.boolean(),
  entregado: z.boolean(),
  proveedor: z.lazy(() => ProveedorCreateNestedOneWithoutPedidoInputSchema)
}).strict();

export const PedidoUncheckedCreateWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.PedidoUncheckedCreateWithoutItemsOnPedidosInput> = z.object({
  id: z.number().int().optional(),
  proveedorId: z.number().int(),
  creado: z.coerce.date(),
  subTotal: z.number(),
  totalImpuestos: z.number(),
  total: z.number(),
  fechaPrevista: z.coerce.date(),
  fechaEntrega: z.coerce.date(),
  pagado: z.boolean(),
  entregado: z.boolean()
}).strict();

export const PedidoCreateOrConnectWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.PedidoCreateOrConnectWithoutItemsOnPedidosInput> = z.object({
  where: z.lazy(() => PedidoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PedidoCreateWithoutItemsOnPedidosInputSchema),z.lazy(() => PedidoUncheckedCreateWithoutItemsOnPedidosInputSchema) ]),
}).strict();

export const ItemUpsertWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.ItemUpsertWithoutItemsOnPedidosInput> = z.object({
  update: z.union([ z.lazy(() => ItemUpdateWithoutItemsOnPedidosInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutItemsOnPedidosInputSchema) ]),
  create: z.union([ z.lazy(() => ItemCreateWithoutItemsOnPedidosInputSchema),z.lazy(() => ItemUncheckedCreateWithoutItemsOnPedidosInputSchema) ]),
  where: z.lazy(() => ItemWhereInputSchema).optional()
}).strict();

export const ItemUpdateToOneWithWhereWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.ItemUpdateToOneWithWhereWithoutItemsOnPedidosInput> = z.object({
  where: z.lazy(() => ItemWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ItemUpdateWithoutItemsOnPedidosInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutItemsOnPedidosInputSchema) ]),
}).strict();

export const ItemUpdateWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.ItemUpdateWithoutItemsOnPedidosInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unidadMedida: z.lazy(() => UnidadMedidaUpdateOneWithoutItemNestedInputSchema).optional(),
  ubicacion: z.lazy(() => UbicacionUpdateOneWithoutItemNestedInputSchema).optional(),
  stock: z.lazy(() => StockUpdateManyWithoutItemNestedInputSchema).optional()
}).strict();

export const ItemUncheckedUpdateWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateWithoutItemsOnPedidosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ubicacionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unidadMedidaId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stock: z.lazy(() => StockUncheckedUpdateManyWithoutItemNestedInputSchema).optional()
}).strict();

export const PedidoUpsertWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.PedidoUpsertWithoutItemsOnPedidosInput> = z.object({
  update: z.union([ z.lazy(() => PedidoUpdateWithoutItemsOnPedidosInputSchema),z.lazy(() => PedidoUncheckedUpdateWithoutItemsOnPedidosInputSchema) ]),
  create: z.union([ z.lazy(() => PedidoCreateWithoutItemsOnPedidosInputSchema),z.lazy(() => PedidoUncheckedCreateWithoutItemsOnPedidosInputSchema) ]),
  where: z.lazy(() => PedidoWhereInputSchema).optional()
}).strict();

export const PedidoUpdateToOneWithWhereWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.PedidoUpdateToOneWithWhereWithoutItemsOnPedidosInput> = z.object({
  where: z.lazy(() => PedidoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PedidoUpdateWithoutItemsOnPedidosInputSchema),z.lazy(() => PedidoUncheckedUpdateWithoutItemsOnPedidosInputSchema) ]),
}).strict();

export const PedidoUpdateWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.PedidoUpdateWithoutItemsOnPedidosInput> = z.object({
  creado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalImpuestos: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fechaPrevista: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fechaEntrega: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pagado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entregado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  proveedor: z.lazy(() => ProveedorUpdateOneRequiredWithoutPedidoNestedInputSchema).optional()
}).strict();

export const PedidoUncheckedUpdateWithoutItemsOnPedidosInputSchema: z.ZodType<Prisma.PedidoUncheckedUpdateWithoutItemsOnPedidosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  proveedorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  creado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalImpuestos: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fechaPrevista: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fechaEntrega: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pagado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entregado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsOnPedidosCreateManyItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosCreateManyItemsInput> = z.object({
  pedidoId: z.number().int(),
  cant: z.number().int(),
  precio: z.number(),
  asignado: z.coerce.date().optional()
}).strict();

export const StockCreateManyItemInputSchema: z.ZodType<Prisma.StockCreateManyItemInput> = z.object({
  id: z.number().int().optional(),
  fecha: z.coerce.date().optional(),
  descripcion: z.string(),
  cant: z.number().int()
}).strict();

export const ItemsOnPedidosUpdateWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateWithoutItemsInput> = z.object({
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  precio: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  asignado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pedido: z.lazy(() => PedidoUpdateOneRequiredWithoutItemsOnPedidosNestedInputSchema).optional()
}).strict();

export const ItemsOnPedidosUncheckedUpdateWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedUpdateWithoutItemsInput> = z.object({
  pedidoId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  precio: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  asignado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsOnPedidosUncheckedUpdateManyWithoutItemsInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedUpdateManyWithoutItemsInput> = z.object({
  pedidoId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  precio: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  asignado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StockUpdateWithoutItemInputSchema: z.ZodType<Prisma.StockUpdateWithoutItemInput> = z.object({
  fecha: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StockUncheckedUpdateWithoutItemInputSchema: z.ZodType<Prisma.StockUncheckedUpdateWithoutItemInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fecha: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StockUncheckedUpdateManyWithoutItemInputSchema: z.ZodType<Prisma.StockUncheckedUpdateManyWithoutItemInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fecha: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemCreateManyUbicacionInputSchema: z.ZodType<Prisma.ItemCreateManyUbicacionInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  unidadMedidaId: z.number().int().optional().nullable()
}).strict();

export const UbicacionCreateManySeccionInputSchema: z.ZodType<Prisma.UbicacionCreateManySeccionInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  corto: z.string(),
  isAlmacen: z.boolean().optional()
}).strict();

export const ItemUpdateWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemUpdateWithoutUbicacionInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unidadMedida: z.lazy(() => UnidadMedidaUpdateOneWithoutItemNestedInputSchema).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUpdateManyWithoutItemsNestedInputSchema).optional(),
  stock: z.lazy(() => StockUpdateManyWithoutItemNestedInputSchema).optional()
}).strict();

export const ItemUncheckedUpdateWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateWithoutUbicacionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unidadMedidaId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedUpdateManyWithoutItemsNestedInputSchema).optional(),
  stock: z.lazy(() => StockUncheckedUpdateManyWithoutItemNestedInputSchema).optional()
}).strict();

export const ItemUncheckedUpdateManyWithoutUbicacionInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateManyWithoutUbicacionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unidadMedidaId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UbicacionUpdateWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionUpdateWithoutSeccionInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  item: z.lazy(() => ItemUpdateManyWithoutUbicacionNestedInputSchema).optional(),
  almacen: z.lazy(() => UbicacionUpdateManyWithoutSeccionNestedInputSchema).optional()
}).strict();

export const UbicacionUncheckedUpdateWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionUncheckedUpdateWithoutSeccionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  item: z.lazy(() => ItemUncheckedUpdateManyWithoutUbicacionNestedInputSchema).optional(),
  almacen: z.lazy(() => UbicacionUncheckedUpdateManyWithoutSeccionNestedInputSchema).optional()
}).strict();

export const UbicacionUncheckedUpdateManyWithoutSeccionInputSchema: z.ZodType<Prisma.UbicacionUncheckedUpdateManyWithoutSeccionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  corto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAlmacen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemCreateManyUnidadMedidaInputSchema: z.ZodType<Prisma.ItemCreateManyUnidadMedidaInput> = z.object({
  id: z.number().int().optional(),
  descripcion: z.string(),
  activo: z.boolean().optional(),
  stockMin: z.number().optional().nullable(),
  stockMax: z.number().optional().nullable(),
  precio: z.number().optional().nullable(),
  ubicacionId: z.number().int().optional().nullable()
}).strict();

export const ItemUpdateWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemUpdateWithoutUnidadMedidaInput> = z.object({
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ubicacion: z.lazy(() => UbicacionUpdateOneWithoutItemNestedInputSchema).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUpdateManyWithoutItemsNestedInputSchema).optional(),
  stock: z.lazy(() => StockUpdateManyWithoutItemNestedInputSchema).optional()
}).strict();

export const ItemUncheckedUpdateWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateWithoutUnidadMedidaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ubicacionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedUpdateManyWithoutItemsNestedInputSchema).optional(),
  stock: z.lazy(() => StockUncheckedUpdateManyWithoutItemNestedInputSchema).optional()
}).strict();

export const ItemUncheckedUpdateManyWithoutUnidadMedidaInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateManyWithoutUnidadMedidaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  descripcion: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activo: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  stockMin: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stockMax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ubicacionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PedidoCreateManyProveedorInputSchema: z.ZodType<Prisma.PedidoCreateManyProveedorInput> = z.object({
  id: z.number().int().optional(),
  creado: z.coerce.date(),
  subTotal: z.number(),
  totalImpuestos: z.number(),
  total: z.number(),
  fechaPrevista: z.coerce.date(),
  fechaEntrega: z.coerce.date(),
  pagado: z.boolean(),
  entregado: z.boolean()
}).strict();

export const PedidoUpdateWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoUpdateWithoutProveedorInput> = z.object({
  creado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalImpuestos: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fechaPrevista: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fechaEntrega: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pagado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entregado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUpdateManyWithoutPedidoNestedInputSchema).optional()
}).strict();

export const PedidoUncheckedUpdateWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoUncheckedUpdateWithoutProveedorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  creado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalImpuestos: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fechaPrevista: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fechaEntrega: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pagado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entregado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ItemsOnPedidos: z.lazy(() => ItemsOnPedidosUncheckedUpdateManyWithoutPedidoNestedInputSchema).optional()
}).strict();

export const PedidoUncheckedUpdateManyWithoutProveedorInputSchema: z.ZodType<Prisma.PedidoUncheckedUpdateManyWithoutProveedorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  creado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalImpuestos: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fechaPrevista: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fechaEntrega: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pagado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entregado: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsOnPedidosCreateManyPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosCreateManyPedidoInput> = z.object({
  itemId: z.number().int(),
  cant: z.number().int(),
  precio: z.number(),
  asignado: z.coerce.date().optional()
}).strict();

export const ItemsOnPedidosUpdateWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateWithoutPedidoInput> = z.object({
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  precio: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  asignado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => ItemUpdateOneRequiredWithoutItemsOnPedidosNestedInputSchema).optional()
}).strict();

export const ItemsOnPedidosUncheckedUpdateWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedUpdateWithoutPedidoInput> = z.object({
  itemId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  precio: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  asignado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsOnPedidosUncheckedUpdateManyWithoutPedidoInputSchema: z.ZodType<Prisma.ItemsOnPedidosUncheckedUpdateManyWithoutPedidoInput> = z.object({
  itemId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cant: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  precio: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  asignado: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ItemFindFirstArgsSchema: z.ZodType<Prisma.ItemFindFirstArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemScalarFieldEnumSchema,ItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ItemFindFirstOrThrowArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemScalarFieldEnumSchema,ItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemFindManyArgsSchema: z.ZodType<Prisma.ItemFindManyArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemScalarFieldEnumSchema,ItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemAggregateArgsSchema: z.ZodType<Prisma.ItemAggregateArgs> = z.object({
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItemGroupByArgsSchema: z.ZodType<Prisma.ItemGroupByArgs> = z.object({
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithAggregationInputSchema.array(),ItemOrderByWithAggregationInputSchema ]).optional(),
  by: ItemScalarFieldEnumSchema.array(),
  having: ItemScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItemFindUniqueArgsSchema: z.ZodType<Prisma.ItemFindUniqueArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const ItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ItemFindUniqueOrThrowArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const UbicacionFindFirstArgsSchema: z.ZodType<Prisma.UbicacionFindFirstArgs> = z.object({
  select: UbicacionSelectSchema.optional(),
  include: UbicacionIncludeSchema.optional(),
  where: UbicacionWhereInputSchema.optional(),
  orderBy: z.union([ UbicacionOrderByWithRelationInputSchema.array(),UbicacionOrderByWithRelationInputSchema ]).optional(),
  cursor: UbicacionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UbicacionScalarFieldEnumSchema,UbicacionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UbicacionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UbicacionFindFirstOrThrowArgs> = z.object({
  select: UbicacionSelectSchema.optional(),
  include: UbicacionIncludeSchema.optional(),
  where: UbicacionWhereInputSchema.optional(),
  orderBy: z.union([ UbicacionOrderByWithRelationInputSchema.array(),UbicacionOrderByWithRelationInputSchema ]).optional(),
  cursor: UbicacionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UbicacionScalarFieldEnumSchema,UbicacionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UbicacionFindManyArgsSchema: z.ZodType<Prisma.UbicacionFindManyArgs> = z.object({
  select: UbicacionSelectSchema.optional(),
  include: UbicacionIncludeSchema.optional(),
  where: UbicacionWhereInputSchema.optional(),
  orderBy: z.union([ UbicacionOrderByWithRelationInputSchema.array(),UbicacionOrderByWithRelationInputSchema ]).optional(),
  cursor: UbicacionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UbicacionScalarFieldEnumSchema,UbicacionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UbicacionAggregateArgsSchema: z.ZodType<Prisma.UbicacionAggregateArgs> = z.object({
  where: UbicacionWhereInputSchema.optional(),
  orderBy: z.union([ UbicacionOrderByWithRelationInputSchema.array(),UbicacionOrderByWithRelationInputSchema ]).optional(),
  cursor: UbicacionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UbicacionGroupByArgsSchema: z.ZodType<Prisma.UbicacionGroupByArgs> = z.object({
  where: UbicacionWhereInputSchema.optional(),
  orderBy: z.union([ UbicacionOrderByWithAggregationInputSchema.array(),UbicacionOrderByWithAggregationInputSchema ]).optional(),
  by: UbicacionScalarFieldEnumSchema.array(),
  having: UbicacionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UbicacionFindUniqueArgsSchema: z.ZodType<Prisma.UbicacionFindUniqueArgs> = z.object({
  select: UbicacionSelectSchema.optional(),
  include: UbicacionIncludeSchema.optional(),
  where: UbicacionWhereUniqueInputSchema,
}).strict() ;

export const UbicacionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UbicacionFindUniqueOrThrowArgs> = z.object({
  select: UbicacionSelectSchema.optional(),
  include: UbicacionIncludeSchema.optional(),
  where: UbicacionWhereUniqueInputSchema,
}).strict() ;

export const StockFindFirstArgsSchema: z.ZodType<Prisma.StockFindFirstArgs> = z.object({
  select: StockSelectSchema.optional(),
  include: StockIncludeSchema.optional(),
  where: StockWhereInputSchema.optional(),
  orderBy: z.union([ StockOrderByWithRelationInputSchema.array(),StockOrderByWithRelationInputSchema ]).optional(),
  cursor: StockWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StockScalarFieldEnumSchema,StockScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StockFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StockFindFirstOrThrowArgs> = z.object({
  select: StockSelectSchema.optional(),
  include: StockIncludeSchema.optional(),
  where: StockWhereInputSchema.optional(),
  orderBy: z.union([ StockOrderByWithRelationInputSchema.array(),StockOrderByWithRelationInputSchema ]).optional(),
  cursor: StockWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StockScalarFieldEnumSchema,StockScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StockFindManyArgsSchema: z.ZodType<Prisma.StockFindManyArgs> = z.object({
  select: StockSelectSchema.optional(),
  include: StockIncludeSchema.optional(),
  where: StockWhereInputSchema.optional(),
  orderBy: z.union([ StockOrderByWithRelationInputSchema.array(),StockOrderByWithRelationInputSchema ]).optional(),
  cursor: StockWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StockScalarFieldEnumSchema,StockScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StockAggregateArgsSchema: z.ZodType<Prisma.StockAggregateArgs> = z.object({
  where: StockWhereInputSchema.optional(),
  orderBy: z.union([ StockOrderByWithRelationInputSchema.array(),StockOrderByWithRelationInputSchema ]).optional(),
  cursor: StockWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StockGroupByArgsSchema: z.ZodType<Prisma.StockGroupByArgs> = z.object({
  where: StockWhereInputSchema.optional(),
  orderBy: z.union([ StockOrderByWithAggregationInputSchema.array(),StockOrderByWithAggregationInputSchema ]).optional(),
  by: StockScalarFieldEnumSchema.array(),
  having: StockScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StockFindUniqueArgsSchema: z.ZodType<Prisma.StockFindUniqueArgs> = z.object({
  select: StockSelectSchema.optional(),
  include: StockIncludeSchema.optional(),
  where: StockWhereUniqueInputSchema,
}).strict() ;

export const StockFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StockFindUniqueOrThrowArgs> = z.object({
  select: StockSelectSchema.optional(),
  include: StockIncludeSchema.optional(),
  where: StockWhereUniqueInputSchema,
}).strict() ;

export const UnidadMedidaFindFirstArgsSchema: z.ZodType<Prisma.UnidadMedidaFindFirstArgs> = z.object({
  select: UnidadMedidaSelectSchema.optional(),
  include: UnidadMedidaIncludeSchema.optional(),
  where: UnidadMedidaWhereInputSchema.optional(),
  orderBy: z.union([ UnidadMedidaOrderByWithRelationInputSchema.array(),UnidadMedidaOrderByWithRelationInputSchema ]).optional(),
  cursor: UnidadMedidaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UnidadMedidaScalarFieldEnumSchema,UnidadMedidaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UnidadMedidaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UnidadMedidaFindFirstOrThrowArgs> = z.object({
  select: UnidadMedidaSelectSchema.optional(),
  include: UnidadMedidaIncludeSchema.optional(),
  where: UnidadMedidaWhereInputSchema.optional(),
  orderBy: z.union([ UnidadMedidaOrderByWithRelationInputSchema.array(),UnidadMedidaOrderByWithRelationInputSchema ]).optional(),
  cursor: UnidadMedidaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UnidadMedidaScalarFieldEnumSchema,UnidadMedidaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UnidadMedidaFindManyArgsSchema: z.ZodType<Prisma.UnidadMedidaFindManyArgs> = z.object({
  select: UnidadMedidaSelectSchema.optional(),
  include: UnidadMedidaIncludeSchema.optional(),
  where: UnidadMedidaWhereInputSchema.optional(),
  orderBy: z.union([ UnidadMedidaOrderByWithRelationInputSchema.array(),UnidadMedidaOrderByWithRelationInputSchema ]).optional(),
  cursor: UnidadMedidaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UnidadMedidaScalarFieldEnumSchema,UnidadMedidaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UnidadMedidaAggregateArgsSchema: z.ZodType<Prisma.UnidadMedidaAggregateArgs> = z.object({
  where: UnidadMedidaWhereInputSchema.optional(),
  orderBy: z.union([ UnidadMedidaOrderByWithRelationInputSchema.array(),UnidadMedidaOrderByWithRelationInputSchema ]).optional(),
  cursor: UnidadMedidaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UnidadMedidaGroupByArgsSchema: z.ZodType<Prisma.UnidadMedidaGroupByArgs> = z.object({
  where: UnidadMedidaWhereInputSchema.optional(),
  orderBy: z.union([ UnidadMedidaOrderByWithAggregationInputSchema.array(),UnidadMedidaOrderByWithAggregationInputSchema ]).optional(),
  by: UnidadMedidaScalarFieldEnumSchema.array(),
  having: UnidadMedidaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UnidadMedidaFindUniqueArgsSchema: z.ZodType<Prisma.UnidadMedidaFindUniqueArgs> = z.object({
  select: UnidadMedidaSelectSchema.optional(),
  include: UnidadMedidaIncludeSchema.optional(),
  where: UnidadMedidaWhereUniqueInputSchema,
}).strict() ;

export const UnidadMedidaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UnidadMedidaFindUniqueOrThrowArgs> = z.object({
  select: UnidadMedidaSelectSchema.optional(),
  include: UnidadMedidaIncludeSchema.optional(),
  where: UnidadMedidaWhereUniqueInputSchema,
}).strict() ;

export const ProveedorFindFirstArgsSchema: z.ZodType<Prisma.ProveedorFindFirstArgs> = z.object({
  select: ProveedorSelectSchema.optional(),
  include: ProveedorIncludeSchema.optional(),
  where: ProveedorWhereInputSchema.optional(),
  orderBy: z.union([ ProveedorOrderByWithRelationInputSchema.array(),ProveedorOrderByWithRelationInputSchema ]).optional(),
  cursor: ProveedorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProveedorScalarFieldEnumSchema,ProveedorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProveedorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProveedorFindFirstOrThrowArgs> = z.object({
  select: ProveedorSelectSchema.optional(),
  include: ProveedorIncludeSchema.optional(),
  where: ProveedorWhereInputSchema.optional(),
  orderBy: z.union([ ProveedorOrderByWithRelationInputSchema.array(),ProveedorOrderByWithRelationInputSchema ]).optional(),
  cursor: ProveedorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProveedorScalarFieldEnumSchema,ProveedorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProveedorFindManyArgsSchema: z.ZodType<Prisma.ProveedorFindManyArgs> = z.object({
  select: ProveedorSelectSchema.optional(),
  include: ProveedorIncludeSchema.optional(),
  where: ProveedorWhereInputSchema.optional(),
  orderBy: z.union([ ProveedorOrderByWithRelationInputSchema.array(),ProveedorOrderByWithRelationInputSchema ]).optional(),
  cursor: ProveedorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProveedorScalarFieldEnumSchema,ProveedorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProveedorAggregateArgsSchema: z.ZodType<Prisma.ProveedorAggregateArgs> = z.object({
  where: ProveedorWhereInputSchema.optional(),
  orderBy: z.union([ ProveedorOrderByWithRelationInputSchema.array(),ProveedorOrderByWithRelationInputSchema ]).optional(),
  cursor: ProveedorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProveedorGroupByArgsSchema: z.ZodType<Prisma.ProveedorGroupByArgs> = z.object({
  where: ProveedorWhereInputSchema.optional(),
  orderBy: z.union([ ProveedorOrderByWithAggregationInputSchema.array(),ProveedorOrderByWithAggregationInputSchema ]).optional(),
  by: ProveedorScalarFieldEnumSchema.array(),
  having: ProveedorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProveedorFindUniqueArgsSchema: z.ZodType<Prisma.ProveedorFindUniqueArgs> = z.object({
  select: ProveedorSelectSchema.optional(),
  include: ProveedorIncludeSchema.optional(),
  where: ProveedorWhereUniqueInputSchema,
}).strict() ;

export const ProveedorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProveedorFindUniqueOrThrowArgs> = z.object({
  select: ProveedorSelectSchema.optional(),
  include: ProveedorIncludeSchema.optional(),
  where: ProveedorWhereUniqueInputSchema,
}).strict() ;

export const PedidoFindFirstArgsSchema: z.ZodType<Prisma.PedidoFindFirstArgs> = z.object({
  select: PedidoSelectSchema.optional(),
  include: PedidoIncludeSchema.optional(),
  where: PedidoWhereInputSchema.optional(),
  orderBy: z.union([ PedidoOrderByWithRelationInputSchema.array(),PedidoOrderByWithRelationInputSchema ]).optional(),
  cursor: PedidoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PedidoScalarFieldEnumSchema,PedidoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PedidoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PedidoFindFirstOrThrowArgs> = z.object({
  select: PedidoSelectSchema.optional(),
  include: PedidoIncludeSchema.optional(),
  where: PedidoWhereInputSchema.optional(),
  orderBy: z.union([ PedidoOrderByWithRelationInputSchema.array(),PedidoOrderByWithRelationInputSchema ]).optional(),
  cursor: PedidoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PedidoScalarFieldEnumSchema,PedidoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PedidoFindManyArgsSchema: z.ZodType<Prisma.PedidoFindManyArgs> = z.object({
  select: PedidoSelectSchema.optional(),
  include: PedidoIncludeSchema.optional(),
  where: PedidoWhereInputSchema.optional(),
  orderBy: z.union([ PedidoOrderByWithRelationInputSchema.array(),PedidoOrderByWithRelationInputSchema ]).optional(),
  cursor: PedidoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PedidoScalarFieldEnumSchema,PedidoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PedidoAggregateArgsSchema: z.ZodType<Prisma.PedidoAggregateArgs> = z.object({
  where: PedidoWhereInputSchema.optional(),
  orderBy: z.union([ PedidoOrderByWithRelationInputSchema.array(),PedidoOrderByWithRelationInputSchema ]).optional(),
  cursor: PedidoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PedidoGroupByArgsSchema: z.ZodType<Prisma.PedidoGroupByArgs> = z.object({
  where: PedidoWhereInputSchema.optional(),
  orderBy: z.union([ PedidoOrderByWithAggregationInputSchema.array(),PedidoOrderByWithAggregationInputSchema ]).optional(),
  by: PedidoScalarFieldEnumSchema.array(),
  having: PedidoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PedidoFindUniqueArgsSchema: z.ZodType<Prisma.PedidoFindUniqueArgs> = z.object({
  select: PedidoSelectSchema.optional(),
  include: PedidoIncludeSchema.optional(),
  where: PedidoWhereUniqueInputSchema,
}).strict() ;

export const PedidoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PedidoFindUniqueOrThrowArgs> = z.object({
  select: PedidoSelectSchema.optional(),
  include: PedidoIncludeSchema.optional(),
  where: PedidoWhereUniqueInputSchema,
}).strict() ;

export const ItemsOnPedidosFindFirstArgsSchema: z.ZodType<Prisma.ItemsOnPedidosFindFirstArgs> = z.object({
  select: ItemsOnPedidosSelectSchema.optional(),
  include: ItemsOnPedidosIncludeSchema.optional(),
  where: ItemsOnPedidosWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOnPedidosOrderByWithRelationInputSchema.array(),ItemsOnPedidosOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsOnPedidosWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsOnPedidosScalarFieldEnumSchema,ItemsOnPedidosScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemsOnPedidosFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ItemsOnPedidosFindFirstOrThrowArgs> = z.object({
  select: ItemsOnPedidosSelectSchema.optional(),
  include: ItemsOnPedidosIncludeSchema.optional(),
  where: ItemsOnPedidosWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOnPedidosOrderByWithRelationInputSchema.array(),ItemsOnPedidosOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsOnPedidosWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsOnPedidosScalarFieldEnumSchema,ItemsOnPedidosScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemsOnPedidosFindManyArgsSchema: z.ZodType<Prisma.ItemsOnPedidosFindManyArgs> = z.object({
  select: ItemsOnPedidosSelectSchema.optional(),
  include: ItemsOnPedidosIncludeSchema.optional(),
  where: ItemsOnPedidosWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOnPedidosOrderByWithRelationInputSchema.array(),ItemsOnPedidosOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsOnPedidosWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsOnPedidosScalarFieldEnumSchema,ItemsOnPedidosScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemsOnPedidosAggregateArgsSchema: z.ZodType<Prisma.ItemsOnPedidosAggregateArgs> = z.object({
  where: ItemsOnPedidosWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOnPedidosOrderByWithRelationInputSchema.array(),ItemsOnPedidosOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsOnPedidosWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItemsOnPedidosGroupByArgsSchema: z.ZodType<Prisma.ItemsOnPedidosGroupByArgs> = z.object({
  where: ItemsOnPedidosWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOnPedidosOrderByWithAggregationInputSchema.array(),ItemsOnPedidosOrderByWithAggregationInputSchema ]).optional(),
  by: ItemsOnPedidosScalarFieldEnumSchema.array(),
  having: ItemsOnPedidosScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItemsOnPedidosFindUniqueArgsSchema: z.ZodType<Prisma.ItemsOnPedidosFindUniqueArgs> = z.object({
  select: ItemsOnPedidosSelectSchema.optional(),
  include: ItemsOnPedidosIncludeSchema.optional(),
  where: ItemsOnPedidosWhereUniqueInputSchema,
}).strict() ;

export const ItemsOnPedidosFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ItemsOnPedidosFindUniqueOrThrowArgs> = z.object({
  select: ItemsOnPedidosSelectSchema.optional(),
  include: ItemsOnPedidosIncludeSchema.optional(),
  where: ItemsOnPedidosWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItemCreateArgsSchema: z.ZodType<Prisma.ItemCreateArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  data: z.union([ ItemCreateInputSchema,ItemUncheckedCreateInputSchema ]),
}).strict() ;

export const ItemUpsertArgsSchema: z.ZodType<Prisma.ItemUpsertArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereUniqueInputSchema,
  create: z.union([ ItemCreateInputSchema,ItemUncheckedCreateInputSchema ]),
  update: z.union([ ItemUpdateInputSchema,ItemUncheckedUpdateInputSchema ]),
}).strict() ;

export const ItemCreateManyArgsSchema: z.ZodType<Prisma.ItemCreateManyArgs> = z.object({
  data: z.union([ ItemCreateManyInputSchema,ItemCreateManyInputSchema.array() ]),
}).strict() ;

export const ItemCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ItemCreateManyAndReturnArgs> = z.object({
  data: z.union([ ItemCreateManyInputSchema,ItemCreateManyInputSchema.array() ]),
}).strict() ;

export const ItemDeleteArgsSchema: z.ZodType<Prisma.ItemDeleteArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const ItemUpdateArgsSchema: z.ZodType<Prisma.ItemUpdateArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  data: z.union([ ItemUpdateInputSchema,ItemUncheckedUpdateInputSchema ]),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const ItemUpdateManyArgsSchema: z.ZodType<Prisma.ItemUpdateManyArgs> = z.object({
  data: z.union([ ItemUpdateManyMutationInputSchema,ItemUncheckedUpdateManyInputSchema ]),
  where: ItemWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItemUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ItemUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ItemUpdateManyMutationInputSchema,ItemUncheckedUpdateManyInputSchema ]),
  where: ItemWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItemDeleteManyArgsSchema: z.ZodType<Prisma.ItemDeleteManyArgs> = z.object({
  where: ItemWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UbicacionCreateArgsSchema: z.ZodType<Prisma.UbicacionCreateArgs> = z.object({
  select: UbicacionSelectSchema.optional(),
  include: UbicacionIncludeSchema.optional(),
  data: z.union([ UbicacionCreateInputSchema,UbicacionUncheckedCreateInputSchema ]),
}).strict() ;

export const UbicacionUpsertArgsSchema: z.ZodType<Prisma.UbicacionUpsertArgs> = z.object({
  select: UbicacionSelectSchema.optional(),
  include: UbicacionIncludeSchema.optional(),
  where: UbicacionWhereUniqueInputSchema,
  create: z.union([ UbicacionCreateInputSchema,UbicacionUncheckedCreateInputSchema ]),
  update: z.union([ UbicacionUpdateInputSchema,UbicacionUncheckedUpdateInputSchema ]),
}).strict() ;

export const UbicacionCreateManyArgsSchema: z.ZodType<Prisma.UbicacionCreateManyArgs> = z.object({
  data: z.union([ UbicacionCreateManyInputSchema,UbicacionCreateManyInputSchema.array() ]),
}).strict() ;

export const UbicacionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UbicacionCreateManyAndReturnArgs> = z.object({
  data: z.union([ UbicacionCreateManyInputSchema,UbicacionCreateManyInputSchema.array() ]),
}).strict() ;

export const UbicacionDeleteArgsSchema: z.ZodType<Prisma.UbicacionDeleteArgs> = z.object({
  select: UbicacionSelectSchema.optional(),
  include: UbicacionIncludeSchema.optional(),
  where: UbicacionWhereUniqueInputSchema,
}).strict() ;

export const UbicacionUpdateArgsSchema: z.ZodType<Prisma.UbicacionUpdateArgs> = z.object({
  select: UbicacionSelectSchema.optional(),
  include: UbicacionIncludeSchema.optional(),
  data: z.union([ UbicacionUpdateInputSchema,UbicacionUncheckedUpdateInputSchema ]),
  where: UbicacionWhereUniqueInputSchema,
}).strict() ;

export const UbicacionUpdateManyArgsSchema: z.ZodType<Prisma.UbicacionUpdateManyArgs> = z.object({
  data: z.union([ UbicacionUpdateManyMutationInputSchema,UbicacionUncheckedUpdateManyInputSchema ]),
  where: UbicacionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UbicacionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UbicacionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UbicacionUpdateManyMutationInputSchema,UbicacionUncheckedUpdateManyInputSchema ]),
  where: UbicacionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UbicacionDeleteManyArgsSchema: z.ZodType<Prisma.UbicacionDeleteManyArgs> = z.object({
  where: UbicacionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StockCreateArgsSchema: z.ZodType<Prisma.StockCreateArgs> = z.object({
  select: StockSelectSchema.optional(),
  include: StockIncludeSchema.optional(),
  data: z.union([ StockCreateInputSchema,StockUncheckedCreateInputSchema ]),
}).strict() ;

export const StockUpsertArgsSchema: z.ZodType<Prisma.StockUpsertArgs> = z.object({
  select: StockSelectSchema.optional(),
  include: StockIncludeSchema.optional(),
  where: StockWhereUniqueInputSchema,
  create: z.union([ StockCreateInputSchema,StockUncheckedCreateInputSchema ]),
  update: z.union([ StockUpdateInputSchema,StockUncheckedUpdateInputSchema ]),
}).strict() ;

export const StockCreateManyArgsSchema: z.ZodType<Prisma.StockCreateManyArgs> = z.object({
  data: z.union([ StockCreateManyInputSchema,StockCreateManyInputSchema.array() ]),
}).strict() ;

export const StockCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StockCreateManyAndReturnArgs> = z.object({
  data: z.union([ StockCreateManyInputSchema,StockCreateManyInputSchema.array() ]),
}).strict() ;

export const StockDeleteArgsSchema: z.ZodType<Prisma.StockDeleteArgs> = z.object({
  select: StockSelectSchema.optional(),
  include: StockIncludeSchema.optional(),
  where: StockWhereUniqueInputSchema,
}).strict() ;

export const StockUpdateArgsSchema: z.ZodType<Prisma.StockUpdateArgs> = z.object({
  select: StockSelectSchema.optional(),
  include: StockIncludeSchema.optional(),
  data: z.union([ StockUpdateInputSchema,StockUncheckedUpdateInputSchema ]),
  where: StockWhereUniqueInputSchema,
}).strict() ;

export const StockUpdateManyArgsSchema: z.ZodType<Prisma.StockUpdateManyArgs> = z.object({
  data: z.union([ StockUpdateManyMutationInputSchema,StockUncheckedUpdateManyInputSchema ]),
  where: StockWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StockUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StockUpdateManyAndReturnArgs> = z.object({
  data: z.union([ StockUpdateManyMutationInputSchema,StockUncheckedUpdateManyInputSchema ]),
  where: StockWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StockDeleteManyArgsSchema: z.ZodType<Prisma.StockDeleteManyArgs> = z.object({
  where: StockWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UnidadMedidaCreateArgsSchema: z.ZodType<Prisma.UnidadMedidaCreateArgs> = z.object({
  select: UnidadMedidaSelectSchema.optional(),
  include: UnidadMedidaIncludeSchema.optional(),
  data: z.union([ UnidadMedidaCreateInputSchema,UnidadMedidaUncheckedCreateInputSchema ]),
}).strict() ;

export const UnidadMedidaUpsertArgsSchema: z.ZodType<Prisma.UnidadMedidaUpsertArgs> = z.object({
  select: UnidadMedidaSelectSchema.optional(),
  include: UnidadMedidaIncludeSchema.optional(),
  where: UnidadMedidaWhereUniqueInputSchema,
  create: z.union([ UnidadMedidaCreateInputSchema,UnidadMedidaUncheckedCreateInputSchema ]),
  update: z.union([ UnidadMedidaUpdateInputSchema,UnidadMedidaUncheckedUpdateInputSchema ]),
}).strict() ;

export const UnidadMedidaCreateManyArgsSchema: z.ZodType<Prisma.UnidadMedidaCreateManyArgs> = z.object({
  data: z.union([ UnidadMedidaCreateManyInputSchema,UnidadMedidaCreateManyInputSchema.array() ]),
}).strict() ;

export const UnidadMedidaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UnidadMedidaCreateManyAndReturnArgs> = z.object({
  data: z.union([ UnidadMedidaCreateManyInputSchema,UnidadMedidaCreateManyInputSchema.array() ]),
}).strict() ;

export const UnidadMedidaDeleteArgsSchema: z.ZodType<Prisma.UnidadMedidaDeleteArgs> = z.object({
  select: UnidadMedidaSelectSchema.optional(),
  include: UnidadMedidaIncludeSchema.optional(),
  where: UnidadMedidaWhereUniqueInputSchema,
}).strict() ;

export const UnidadMedidaUpdateArgsSchema: z.ZodType<Prisma.UnidadMedidaUpdateArgs> = z.object({
  select: UnidadMedidaSelectSchema.optional(),
  include: UnidadMedidaIncludeSchema.optional(),
  data: z.union([ UnidadMedidaUpdateInputSchema,UnidadMedidaUncheckedUpdateInputSchema ]),
  where: UnidadMedidaWhereUniqueInputSchema,
}).strict() ;

export const UnidadMedidaUpdateManyArgsSchema: z.ZodType<Prisma.UnidadMedidaUpdateManyArgs> = z.object({
  data: z.union([ UnidadMedidaUpdateManyMutationInputSchema,UnidadMedidaUncheckedUpdateManyInputSchema ]),
  where: UnidadMedidaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UnidadMedidaUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UnidadMedidaUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UnidadMedidaUpdateManyMutationInputSchema,UnidadMedidaUncheckedUpdateManyInputSchema ]),
  where: UnidadMedidaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UnidadMedidaDeleteManyArgsSchema: z.ZodType<Prisma.UnidadMedidaDeleteManyArgs> = z.object({
  where: UnidadMedidaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProveedorCreateArgsSchema: z.ZodType<Prisma.ProveedorCreateArgs> = z.object({
  select: ProveedorSelectSchema.optional(),
  include: ProveedorIncludeSchema.optional(),
  data: z.union([ ProveedorCreateInputSchema,ProveedorUncheckedCreateInputSchema ]),
}).strict() ;

export const ProveedorUpsertArgsSchema: z.ZodType<Prisma.ProveedorUpsertArgs> = z.object({
  select: ProveedorSelectSchema.optional(),
  include: ProveedorIncludeSchema.optional(),
  where: ProveedorWhereUniqueInputSchema,
  create: z.union([ ProveedorCreateInputSchema,ProveedorUncheckedCreateInputSchema ]),
  update: z.union([ ProveedorUpdateInputSchema,ProveedorUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProveedorCreateManyArgsSchema: z.ZodType<Prisma.ProveedorCreateManyArgs> = z.object({
  data: z.union([ ProveedorCreateManyInputSchema,ProveedorCreateManyInputSchema.array() ]),
}).strict() ;

export const ProveedorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProveedorCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProveedorCreateManyInputSchema,ProveedorCreateManyInputSchema.array() ]),
}).strict() ;

export const ProveedorDeleteArgsSchema: z.ZodType<Prisma.ProveedorDeleteArgs> = z.object({
  select: ProveedorSelectSchema.optional(),
  include: ProveedorIncludeSchema.optional(),
  where: ProveedorWhereUniqueInputSchema,
}).strict() ;

export const ProveedorUpdateArgsSchema: z.ZodType<Prisma.ProveedorUpdateArgs> = z.object({
  select: ProveedorSelectSchema.optional(),
  include: ProveedorIncludeSchema.optional(),
  data: z.union([ ProveedorUpdateInputSchema,ProveedorUncheckedUpdateInputSchema ]),
  where: ProveedorWhereUniqueInputSchema,
}).strict() ;

export const ProveedorUpdateManyArgsSchema: z.ZodType<Prisma.ProveedorUpdateManyArgs> = z.object({
  data: z.union([ ProveedorUpdateManyMutationInputSchema,ProveedorUncheckedUpdateManyInputSchema ]),
  where: ProveedorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProveedorUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProveedorUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProveedorUpdateManyMutationInputSchema,ProveedorUncheckedUpdateManyInputSchema ]),
  where: ProveedorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProveedorDeleteManyArgsSchema: z.ZodType<Prisma.ProveedorDeleteManyArgs> = z.object({
  where: ProveedorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PedidoCreateArgsSchema: z.ZodType<Prisma.PedidoCreateArgs> = z.object({
  select: PedidoSelectSchema.optional(),
  include: PedidoIncludeSchema.optional(),
  data: z.union([ PedidoCreateInputSchema,PedidoUncheckedCreateInputSchema ]),
}).strict() ;

export const PedidoUpsertArgsSchema: z.ZodType<Prisma.PedidoUpsertArgs> = z.object({
  select: PedidoSelectSchema.optional(),
  include: PedidoIncludeSchema.optional(),
  where: PedidoWhereUniqueInputSchema,
  create: z.union([ PedidoCreateInputSchema,PedidoUncheckedCreateInputSchema ]),
  update: z.union([ PedidoUpdateInputSchema,PedidoUncheckedUpdateInputSchema ]),
}).strict() ;

export const PedidoCreateManyArgsSchema: z.ZodType<Prisma.PedidoCreateManyArgs> = z.object({
  data: z.union([ PedidoCreateManyInputSchema,PedidoCreateManyInputSchema.array() ]),
}).strict() ;

export const PedidoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PedidoCreateManyAndReturnArgs> = z.object({
  data: z.union([ PedidoCreateManyInputSchema,PedidoCreateManyInputSchema.array() ]),
}).strict() ;

export const PedidoDeleteArgsSchema: z.ZodType<Prisma.PedidoDeleteArgs> = z.object({
  select: PedidoSelectSchema.optional(),
  include: PedidoIncludeSchema.optional(),
  where: PedidoWhereUniqueInputSchema,
}).strict() ;

export const PedidoUpdateArgsSchema: z.ZodType<Prisma.PedidoUpdateArgs> = z.object({
  select: PedidoSelectSchema.optional(),
  include: PedidoIncludeSchema.optional(),
  data: z.union([ PedidoUpdateInputSchema,PedidoUncheckedUpdateInputSchema ]),
  where: PedidoWhereUniqueInputSchema,
}).strict() ;

export const PedidoUpdateManyArgsSchema: z.ZodType<Prisma.PedidoUpdateManyArgs> = z.object({
  data: z.union([ PedidoUpdateManyMutationInputSchema,PedidoUncheckedUpdateManyInputSchema ]),
  where: PedidoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PedidoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PedidoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PedidoUpdateManyMutationInputSchema,PedidoUncheckedUpdateManyInputSchema ]),
  where: PedidoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PedidoDeleteManyArgsSchema: z.ZodType<Prisma.PedidoDeleteManyArgs> = z.object({
  where: PedidoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItemsOnPedidosCreateArgsSchema: z.ZodType<Prisma.ItemsOnPedidosCreateArgs> = z.object({
  select: ItemsOnPedidosSelectSchema.optional(),
  include: ItemsOnPedidosIncludeSchema.optional(),
  data: z.union([ ItemsOnPedidosCreateInputSchema,ItemsOnPedidosUncheckedCreateInputSchema ]),
}).strict() ;

export const ItemsOnPedidosUpsertArgsSchema: z.ZodType<Prisma.ItemsOnPedidosUpsertArgs> = z.object({
  select: ItemsOnPedidosSelectSchema.optional(),
  include: ItemsOnPedidosIncludeSchema.optional(),
  where: ItemsOnPedidosWhereUniqueInputSchema,
  create: z.union([ ItemsOnPedidosCreateInputSchema,ItemsOnPedidosUncheckedCreateInputSchema ]),
  update: z.union([ ItemsOnPedidosUpdateInputSchema,ItemsOnPedidosUncheckedUpdateInputSchema ]),
}).strict() ;

export const ItemsOnPedidosCreateManyArgsSchema: z.ZodType<Prisma.ItemsOnPedidosCreateManyArgs> = z.object({
  data: z.union([ ItemsOnPedidosCreateManyInputSchema,ItemsOnPedidosCreateManyInputSchema.array() ]),
}).strict() ;

export const ItemsOnPedidosCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ItemsOnPedidosCreateManyAndReturnArgs> = z.object({
  data: z.union([ ItemsOnPedidosCreateManyInputSchema,ItemsOnPedidosCreateManyInputSchema.array() ]),
}).strict() ;

export const ItemsOnPedidosDeleteArgsSchema: z.ZodType<Prisma.ItemsOnPedidosDeleteArgs> = z.object({
  select: ItemsOnPedidosSelectSchema.optional(),
  include: ItemsOnPedidosIncludeSchema.optional(),
  where: ItemsOnPedidosWhereUniqueInputSchema,
}).strict() ;

export const ItemsOnPedidosUpdateArgsSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateArgs> = z.object({
  select: ItemsOnPedidosSelectSchema.optional(),
  include: ItemsOnPedidosIncludeSchema.optional(),
  data: z.union([ ItemsOnPedidosUpdateInputSchema,ItemsOnPedidosUncheckedUpdateInputSchema ]),
  where: ItemsOnPedidosWhereUniqueInputSchema,
}).strict() ;

export const ItemsOnPedidosUpdateManyArgsSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateManyArgs> = z.object({
  data: z.union([ ItemsOnPedidosUpdateManyMutationInputSchema,ItemsOnPedidosUncheckedUpdateManyInputSchema ]),
  where: ItemsOnPedidosWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItemsOnPedidosUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ItemsOnPedidosUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ItemsOnPedidosUpdateManyMutationInputSchema,ItemsOnPedidosUncheckedUpdateManyInputSchema ]),
  where: ItemsOnPedidosWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItemsOnPedidosDeleteManyArgsSchema: z.ZodType<Prisma.ItemsOnPedidosDeleteManyArgs> = z.object({
  where: ItemsOnPedidosWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;