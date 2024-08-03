import { IsString, IsNumber, IsArray, IsBoolean, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @IsString()
  material: string;

  @IsBoolean()
  seasonal: boolean;

  @IsArray()
  @IsString({ each: true })
  offers: string[];

  @IsInt()
  categoryId: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsBoolean()
  seasonal?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  offers?: string[];

  @IsOptional()
  @IsInt()
  categoryId?: number;
}
