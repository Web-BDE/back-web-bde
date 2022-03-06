import { FastifyInstance } from "fastify";
import * as Minio from "minio";

export function AvatarQueries(fastify: FastifyInstance, client: Minio.Client) {
  return {
    putAvatar: async function (avatar: Buffer, userId: number) {
      try {
        await client.putObject("avatars", `${userId}`, avatar);
      } catch (err) {
        fastify.log.error(err);

        throw fastify.httpErrors.internalServerError("Avatar upload failed");
      }
    },
    getAvatar: async function (userId: number) {
      let avatar;
      try {
        avatar = await client.getObject("avatars", `${userId}`);
      } catch (err) {
        fastify.log.error(err);

        throw fastify.httpErrors.internalServerError("Avatar download failed");
      }
      return avatar;
    },
    deleteAvatar: async function (userId: number) {
      try {
        await client.removeObject("avatars", `${userId}`);
      } catch (err) {
        fastify.log.error(err);

        throw fastify.httpErrors.internalServerError("Avatar delete failed");
      }
    },
  };
}
