/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Book {
    stock: (arg0: number, stock: any) => number;
    bookCover: string | undefined;
    _id: string;
    title: string;
    author: string;
    price: number;
    product_model: string;
    image: string;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
    id: string;
  }
  
  interface Meta {
    total: number;
    page: number;
    limit: number;
  }
  
  export interface BookApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    meta: Meta;
    data: Book[] | [];
  }