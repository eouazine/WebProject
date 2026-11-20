import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Association } from './association.entity';
import { User } from '../users/user.entity';
import { AssociationsService } from './associations.service';

@Controller('associations')
export class AssociationsController {

    constructor(
        private service: AssociationsService
    ) {}

    @Get() //PERMET DE RECUPERER TOUTES LES ASSOCIATIONS DU TABLEAU
    getAll(): Association[] {
        return this.service.getAll();
    }

    @Get(':id/members') //PERMET DE RECUPERER LES MEMBRES D'UNE ASSOCIATION AVEC SON ID
    getMembers(@Param() parameter: any): User[] {
        const association = this.service.getById(+parameter.id);
        if (association === undefined) {
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND); // EN ANGLAIS POUR COLLER AVEC LE MESSAGE D'ERREUR DE USER
        }
        return this.service.getMembers(+parameter.id);
    }

    @Get(':id') //PERMET DE RECUPERER UNE ASSOCIATION AVEC SON ID
    getById(@Param() parameter: any): Association {
        const association = this.service.getById(+parameter.id);
        if (association === undefined) {
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return association;
    }

    @Post() //PERMET DE RAJOUTER UNE ASSOCIATION DANS LE TABLEAU
    create(@Body() input: any): Association {
        return this.service.create(input.idUsers, input.name);
    }

    @Put(':id') //PERMET DE MODIFIER LES MEMBRES ET/OU LE NOM D'UNE ASSOCIATION
    update(@Param() parameter: any, @Body() input: any): Association {
        const association = this.service.getById(+parameter.id);
        if (association === undefined) {
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return this.service.update(+parameter.id, input.idUsers, input.name);
    }

    @Delete(':id') //PERMET DE SUPPRIMER UNE ASSOCIATION AVEC SON ID
    delete(@Param() parameter: any): boolean {
        const association = this.service.getById(+parameter.id);
        if (association === undefined) {
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return this.service.delete(+parameter.id);
    }

}
