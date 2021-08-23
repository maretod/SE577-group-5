import Stop from "../models/Stop";

export class StopProvider {
    private stops?: readonly Stop[];

    fetchStops(callback: (stops: readonly Stop[]) => void) {
        if (this.stops) {
            callback(this.stops);
            return;
        }

        fetch("/api/itinerary/stops")
            .then(res => res.json())
            .then(res => res as StopDto[])
            .then(res => res.map(dto => new Stop(dto.stop_id, dto.otpId, dto.name)))
            .then(res => this.stops = res)
            .then(res => callback(res));
    }
}

interface StopDto {
    stop_id: number;
    otpId: string;
    name: string;
};