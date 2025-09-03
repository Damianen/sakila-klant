import * as ActorRepo from "../repositories/actor-repository.js";

export function GetAllActors(callback) {
    ActorRepo.GetAllActors(callback);
}

export function GetActorById(id, callback) {
    const numberId = Number(id);
    ActorRepo.GetActorById(numberId, callback);
}
