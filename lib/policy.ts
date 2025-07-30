import { User, Image, Like } from '@prisma/client'

const policy = {
  user: {
    view: (currentUser: User, user: User) => currentUser.id === user.id,
  },
  image: {
    update: (user: User, image: Image) => image.userId === user.id,
    delete: (user: User, image: Image) => image.userId === user.id,
  },
  like: {
    view: (user: User, like: Like) => user.id === like.userId
  }
}

export default policy
