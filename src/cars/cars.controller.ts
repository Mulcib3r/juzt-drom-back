import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CarDto } from "./car.dto";

@Controller("cars")
export class CarsController {
	constructor(private readonly carsService: CarsService) {}

	@Get("total")
	async getTotalPages(@Query("limit", ParseIntPipe) limit: number) {
		return this.carsService.getTotalPages(limit);
	}

	@Get()
	async getCars(
		@Query("page", ParseIntPipe) page: number,
		@Query("limit", ParseIntPipe) limit: number,
		@Query("keyword") keyword: string,
		@Query("sort") sort: string
	) {
		return await this.carsService.getCars(page, limit, keyword, sort);
	}

	@Get(":id")
	async getCarById(@Param("id") id: string) {
		return this.carsService.getCarById(id);
	}

	@Post()
	@UsePipes(new ValidationPipe())
	async addCar(@Body() dto: CarDto) {
		return this.carsService.addCar(dto);
	}

	@Delete(":id")
	async deleteCar(@Param("id") id: string) {
		return this.carsService.removeCar(id);
	}
}
