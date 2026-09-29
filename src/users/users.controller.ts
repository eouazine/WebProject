import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { User } from './user.entity';

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John'
    }
]

@Controller('users')
export class UsersController {

    @Get() //PERMET DE RECUPERER TOUS LES USERS DU TABLEAU
    getAll(): User[] {
        return users;
    }

    @Get(':id') //PERMET DE RECUPERER UN USER AVEC SON ID
    getById(@Param() parameter: any): User {
        const user = users.filter(user => user.id === +parameter.id)[0];
        if (user === undefined) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Post() //PERMET DE RAJOUTER DES USERS DANS LE TABLEAU
    create(@Body() input: any): User {
        const newUser = { id: users.length, lastname: input.lastname, firstname: input.firstname };
        users.push(newUser);
        return newUser;
    }

    @Put(':id') //PERMET DE MODIFIER LE NOM ET/OU LE PRENOM D'UN USER
    update(@Param() parameter: any, @Body() input: any): User {
        const user = this.getById(parameter);
        if (input.firstname !== undefined) user.firstname = input.firstname;
        if (input.lastname !== undefined) user.lastname = input.lastname;
        return user;
    }

    @Delete(':id') //PERMET DE SUPPRIMER UN USER AVEC SON ID
    delete(@Param() parameter: any): boolean {
        const user = this.getById(parameter);
        users.splice(users.indexOf(user), 1);
        return true;
    }

}