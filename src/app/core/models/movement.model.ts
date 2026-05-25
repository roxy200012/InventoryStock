export interface Movement {
  id: number;
  productId: number;
  type: 'IN' | 'OUT';   // carico / scarico
  quantity: number;
  date: string;         // ISO string: '2025-02-10'
}