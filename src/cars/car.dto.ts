import { IsString } from "class-validator";

export class CarDto {
	@IsString()
	year: string;
	@IsString()
	brand: string;
	@IsString()
	model: string;
	@IsString()
	body: string;
	@IsString()
	color: string;
	@IsString()
	price: string;
	@IsString()
	engine: string;
	@IsString()
	transmission: string;
	@IsString()
	range: string;
	@IsString()
	picture: string;
}
