import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Product from './product'

@Entity('product_detail')
export default class ProductDetail {
  @PrimaryGeneratedColumn({ name: 'id' })
  @IsOptional()
  @IsNumber()
  public id: number;

  @Column({ name: 'name' })
  @IsNotEmpty()
  @MaxLength(100)
  public name: string;

  @Column({ name: 'description', type: 'text' })
  public description?: string;

  @Column({ name: 'price', type: 'varchar' })
  @IsNotEmpty()
  public price: string;

  @OneToOne(
    () => Product,
    (product) => product.productDetail,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'productDetailId' })
  public product: Product;
}
