import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService
    ) {}

    @Get() //PERMET DE RECUPERER TOUS LES USERS DU TABLEAU
    getAll(): User[] {
        return this.service.getAll();
    }

    @Get(':id') //PERMET DE RECUPERER UN USER AVEC SON ID
    getById(@Param() parameter: any): User {
        const user = this.service.getById(+parameter.id);
        if (user === undefined) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Post() //PERMET DE RAJOUTER UN USER DANS LE TABLEAU
    create(@Body() input: any): User {
        return this.service.create(input.lastname, input.firstname, input.age);
    }

    @Put(':id') //PERMET DE MODIFIER LE NOM, LE PRENOM ET/OU L'AGE D'UN USER
    update(@Param() parameter: any, @Body() input: any): User {
        const user = this.service.getById(+parameter.id);
        if (user === undefined) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return this.service.update(+parameter.id, input.firstname, input.lastname, input.age);
    }

    @Delete(':id') //PERMET DE SUPPRIMER UN USER AVEC SON ID
    delete(@Param() parameter: any): boolean {
        const user = this.service.getById(+parameter.id);
        if (user === undefined) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return this.service.delete(+parameter.id);
    }

}
