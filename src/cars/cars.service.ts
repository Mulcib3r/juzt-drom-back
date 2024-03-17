import { Injectable, NotFoundException } from "@nestjs/common";
import { CarDto } from "./car.dto";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CarsService {
	constructor(private prisma: PrismaService) {}

	async getCars(
		page: number,
		limit: number,
		keyword?: string,
		sort?: string
	) {
		const skip = (page - 1) * limit;
		let whereClause = {};
		if (keyword) {
			whereClause = {
				OR: [
					{ brand: { contains: keyword, mode: "insensitive" } },
					{ color: { contains: keyword, mode: "insensitive" } },
				],
			};
		}

		let orderBy: Prisma.CarOrderByWithRelationInput[] = [{ id: "desc" }];
		if (sort === "desc") {
			orderBy = [{ year: "desc" }, { id: "desc" }];
		} else if (sort === "asc") {
			orderBy = [{ year: "asc" }, { id: "desc" }];
		}

		const cars = await this.prisma.car.findMany({
			where: whereClause,
			take: limit,
			skip,
			orderBy: orderBy,
		});

		return cars;
	}

	async getTotalPages(limit: number) {
		const totalCars = await this.prisma.car.count();
		const totalPages = Math.floor(totalCars / limit);
		return totalPages;
	}

	async getCarById(id: string) {
		const car = await this.prisma.car.findUnique({
			where: {
				id: +id,
			},
		});
		if (!car) throw new NotFoundException("Car not found!");
		return car;
	}

	async removeCar(id: string) {
		return this.prisma.car.delete({
			where: {
				id: +id,
			},
		});
	}

	async addCar(dto: CarDto) {
		return await this.prisma.car.create({ data: dto });
	}
}
