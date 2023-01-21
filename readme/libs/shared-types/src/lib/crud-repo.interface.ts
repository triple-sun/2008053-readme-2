export interface ICRUDRepo<E, I, R> {
  findOne(id: I): Promise<R | null>;
  create(item: E): Promise<R>;
  update?(id: I, item: E): Promise<R>;
  destroy(id: I): Promise<void>;
}

export interface ICRUDEmailRepo<E, I, R> extends ICRUDRepo<E, I, R> {
  findByEmail(email: string): Promise<R | null>
}
