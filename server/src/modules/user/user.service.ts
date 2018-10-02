import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './user.entity'
import { RegisterDto } from './dto/register.dto'
import { RegisterResponse } from 'graphql.schema'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) {}

    async register(register: RegisterDto): Promise<RegisterResponse> {
        const { email } = register

        const checkIfEmailExists = await this.userRepo.findOne({
            where: { email }
        })

        if (checkIfEmailExists) {
            return {
                ok: false
            }
        }

        try {
            const newUser = this.userRepo.create({ ...register })
            await this.userRepo.save(newUser)

            return {
                ok: true
            }
        } catch (err) {
            return {
                ok: false
            }
        }
    }
}
