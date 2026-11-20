import { Injectable } from '@nestjs/common';
import { Association } from './association.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

const associations: Association[] = [
    {
        id: 0,
        idUsers: [0],
        name: "Association ISATI 67"
    }
]

@Injectable()
export class AssociationsService {

    constructor(
        private service: UsersService
    ) {}

    //PERMET DE RECUPERER TOUTES LES ASSOCIATIONS DU TABLEAU
    getAll(): Association[] {
        return associations;
    }

    //PERMET DE RECUPERER UNE ASSOCIATION AVEC SON ID
    getById(id: number): Association {
        return associations.filter(association => association.id === id)[0];
    }

    //PERMET DE RAJOUTER UNE ASSOCIATION DANS LE TABLEAU
    create(idUsers: number[], name: string): Association {
        const newAssociation = { id: associations.length, idUsers: idUsers, name: name };
        associations.push(newAssociation);
        return newAssociation;
    }

    //PERMET DE MODIFIER LES MEMBRES ET/OU LE NOM D'UNE ASSOCIATION
    update(id: number, idUsers: number[], name: string): Association {
        const association = this.getById(id);
        if (idUsers !== undefined) association.idUsers = idUsers;
        if (name !== undefined) association.name = name;
        return association;
    }

    //PERMET DE SUPPRIMER UNE ASSOCIATION AVEC SON ID
    delete(id: number): boolean {
        const association = this.getById(id);
        associations.splice(associations.indexOf(association), 1);
        return true;
    }

    //PERMET DE RECUPERER LES MEMBRES D'UNE ASSOCIATION AVEC SON ID
    getMembers(id: number): User[] {
        const association = this.getById(id);
        return association.idUsers.map(idUser => this.service.getById(idUser));
    }

}
