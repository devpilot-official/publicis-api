import { faker } from '@faker-js/faker'
import request from 'supertest'
import app from '@/app'
import { user } from '../data/card.data'

const createUserCard = async () => {
  const res = await request(app).post('/card/new').send(user).expect(201)
}



describe('Credit Card Service Routes', () => {
    let newUser: any

    beforeEach(async () => {
        newUser = {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            cardNumber: faker.finance.creditCardNumber(),
            limit: 0
        }
        // await createUserCard()
    })

    describe('Home Route - GET /', () => {
        it('should return 200 for home route', async () => {
            const res = await request(app).get('/').expect(200)
            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')

            expect(res.body.code).toEqual(200)
        })

        it('should return 404 for unknown home route', async () => {
            const res = await request(app).post('/').expect(404)

            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(404)
            expect(res.body.message).toEqual("Not found")
        })
    })

    describe('User Credit Card Creation Route - POST /card/new', () => {
        const url = '/card/new'

        it('should return 201 for successful user card creation 16 digits', async () => {
            newUser.cardNumber = faker.finance.creditCardNumber('48[7-9]#-####-####-###L').replace(/-/g, " ")
            const res = await request(app).post(url).send(newUser).expect(201)
        
            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')

            expect(res.body.code).toEqual(201)
            expect(res.body.message).toEqual("User card created")
            expect(res.body.data).not.toBeNull()
        })

        it('should return 201 for successful user card creation 15 digits', async () => {
            newUser.cardNumber = faker.finance.creditCardNumber('48[7-9]#-####-####-##L').replace(/-/g, " ")
            const res = await request(app).post(url).send(newUser).expect(201)
        
            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')

            expect(res.body.code).toEqual(201)
            expect(res.body.message).toEqual("User card created")
            expect(res.body.data).not.toBeNull()
        })

        it('should return 400 for user card number greater than 16', async () => {
            newUser.cardNumber = faker.finance.creditCardNumber('48[7-9]#-####-####-####-##L').replace(/-/g, " ")
            const res = await request(app).post(url).send(newUser).expect(400)
        
            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(400)
            expect(res.body.message).toEqual("Invalid card number!")
            expect(res.body.stack).not.toBeNull()
        })

        it('should return 400 for user card number less than 15', async () => {
            newUser.cardNumber = '12345'
            const res = await request(app).post(url).send(newUser).expect(400)
        
            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(400)
            expect(res.body.message).toEqual("Invalid card number!")
            expect(res.body.stack).not.toBeNull()
        })

        it('should return 400 for user card number with unwanted character and letter', async () => {
            newUser.cardNumber = '12345*IMF;5457HGDE'
            const res = await request(app).post(url).send(newUser).expect(400)
        
            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(400)
            expect(res.body.message).toEqual("Invalid card number!")
            expect(res.body.stack).not.toBeNull()
        })

        it('should return 400 status if name is not defined', async () => {
            delete newUser.name
            const res = await request(app).post(url).send(newUser).expect(400)

            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(400)
            expect(res.body.message).toBe("Name is required!")
            expect(res.body.stack).not.toBeNull()
        })

        it('should return 400 status if name has no value', async () => {
            newUser.name = ''
            const res = await request(app).post(url).send(newUser).expect(400)

            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(400)
            expect(res.body.message).toBe("Name is required!")
            expect(res.body.stack).not.toBeNull()
        })

        it('should return 400 status if card number is not defined', async () => {
            delete newUser.cardNumber
            const res = await request(app).post(url).send(newUser).expect(400)

            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(400)
            expect(res.body.message).toBe("Card Number is required!")
            expect(res.body.stack).not.toBeNull()
        })

        it('should return 400 status if card number has no value', async () => {
            newUser.cardNumber = ''
            const res = await request(app).post(url).send(newUser).expect(400)

            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(400)
            expect(res.body.message).toBe("Card Number is required!")
            expect(res.body.stack).not.toBeNull()
        })

        it('should return 400 status if limit is not defined', async () => {
            delete newUser.limit
            const res = await request(app).post(url).send(newUser).expect(400)

            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(400)
            expect(res.body.message).toBe("Limit is required!")
            expect(res.body.stack).not.toBeNull()
        })

        it('should return 400 status if limit has no value', async () => {
            newUser.limit = ''
            const res = await request(app).post(url).send(newUser).expect(400)

            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(400)
            expect(res.body.message).toBe("Limit is required!")
            expect(res.body.stack).not.toBeNull()
        })

        it('should return 404 for unknown card creation route', async () => {
            const res = await request(app).get(url).expect(404)

            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('stack')

            expect(res.body.code).toEqual(404)
            expect(res.body.message).toEqual("Not found")
        })
    })
})
