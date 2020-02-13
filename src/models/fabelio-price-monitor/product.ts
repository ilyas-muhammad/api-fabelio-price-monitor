import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import ProductDetail from './productDetail';

@Entity('product')
export default class Product {
  @PrimaryGeneratedColumn({ name: 'id' })
  @IsOptional()
  @IsNumber()
  public id: number;

  @Column({ name: 'product_detail_id' })
  @IsNotEmpty()
  @IsNumber()
  public productDetailId: number;

  @Column({ name: 'url' })
  @IsNotEmpty()
  @MaxLength(100)
  public url: string;

  @Column({ name: 'created_at' })
  public createdAt: string;

  @OneToOne(
    () => ProductDetail,
    (productDetail) => productDetail.product,
  )
  @JoinColumn({ name: 'product_detail_id', referencedColumnName: 'id' })
  public productDetail: ProductDetail;
}
