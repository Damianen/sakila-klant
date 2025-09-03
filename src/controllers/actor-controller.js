import * as ActorService from "../services/actor-service.js";

export function ListActors(req, res, next) {
    ActorService.GetAllActors((err, actors) => {
        if (err) next(err)
        res.render("actors", { items: actors });
    });
}

export async function GetActor(req, res, next) {
    const id = req.params['id'];
    ActorService.GetActorById(id, (err, actor) => {
        if (err) next(err)
        res.render("actors/actor", { item: actor });
    });
}
