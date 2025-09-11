import * as reservationRepository from "../repositories/reservation-repository.js";

export function AddReservation(inventoryId, userId, callback) {
    const numIds = [Number(inventoryId), Number(userId)];
    reservationRepository.AddReservation(numIds[0], numIds[1], callback);
}

export function GetUserReservations(userId, callback) {
    const numUserId = Number(userId);
    reservationRepository.GetUserReservations(numUserId, callback);
}

export function DeleteReservations(id, userId, callback) {
    const numId = Number(id);
    const numUserId = Number(userId);
    reservationRepository.DeleteResorvation(numId, numUserId, callback);
}
