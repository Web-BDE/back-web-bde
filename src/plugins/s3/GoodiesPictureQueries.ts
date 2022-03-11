import { FastifyInstance } from "fastify";
import * as Minio from "minio";
import internal = require("stream");

export function GoodiesPictureQueries(fastify: FastifyInstance, client: Minio.Client) {
  return {
    putGoodiesPicture: async function (goodiesPicture: internal.Readable, goodiesId: number) {
      try {
        return await client.putObject("goodiespictures", `${goodiesId}`, goodiesPicture);
      } catch (err) {
        fastify.log.error(err);

        throw fastify.httpErrors.internalServerError("Goodies Picture upload failed");
      }
    },
    getGoodiesPicture: async function (goodiesId: number) {
      try {
        return await client.getObject("goodiespictures", `${goodiesId}`);
      } catch (err) {
        if (
          err instanceof Error &&
          err.message.includes("The specified key does not exist")
        ) {
          throw fastify.httpErrors.notFound("Goodies Picture not found");
        }

        fastify.log.error(err);

        throw fastify.httpErrors.internalServerError("Goodies Picture download failed");
      }
    },
    getManyGoodiesPicture: async function (offset: number, limit: number) {
      let allQueriesSucceded = true;
      let goodiesPictures: internal.Readable[] = [];
      for (let index = offset; index <= limit + offset; index++) {
        try {
          goodiesPictures.push(await client.getObject("goodiesPictures", `${index}`));
        } catch (err) {
          if (
            !(
              err instanceof Error &&
              err.message.includes("The specified key does not exist")
            )
          ) {
            fastify.log.error(err);

            throw fastify.httpErrors.internalServerError(
              "GoodiesPicture download failed"
            );
          }
          allQueriesSucceded = false;
        }
      }
      return goodiesPictures;
    },
    deleteGoodiesPicture: async function (goodiesId: number) {
      try {
        return await client.removeObject("goodiespictures", `${goodiesId}`);
      } catch (err) {
        fastify.log.error(err);

        throw fastify.httpErrors.internalServerError("GoodiesPicture delete failed");
      }
    },
  };
}