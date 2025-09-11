import * as reservationService from "../services/reservation-service.js";

export function AddReservation(req, res, next) {
    const inventoryId = req.params['id'];
    const userId = req.user.user_id;

    reservationService.AddReservation(inventoryId, userId, (err) => {
        if (err) next(err);
        res.redirect("/reservations");
    });
}

export function GetUserRepositories(req, res, next) {
    const userId = req.user.user_id;

    reservationService.GetUserReservations(userId, (err, reservations) => {
        if (err) next(err);
        res.render('users/reservations', { items: reservations });
    });
}

export function DeleteReservation(req, res, next) {
    const id = req.params["id"];
    const userId = req.user.user_id;

    reservationService.DeleteReservations(id, userId, (err) => {
        if (err) next(err);
        res.redirect("/reservations");
    })
}