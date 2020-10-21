import { Restaurant } from './restaurant';
import { User } from './user';

export class Review {
    _id: string;
    stars: number;
    comment: string;
    restaurant: Restaurant;
    reviewer: User;
    createdDate: Date;
}