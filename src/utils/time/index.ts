import { timeUnits } from '@app/utils/constants/constants';

export const convertToMilliseconds = (key: string, value: number) => {
    const unit = timeUnits.find((unit) => unit.key === key);
    if (!unit) {
        throw new Error(`Invalid time unit key: ${key}`);
    }

    switch (unit.key) {
        case "s":
            return value * 1000;
        case "m":
            return value * 60 * 1000;
        case "h":
            return value * 60 * 60 * 1000;
        case "d":
            return value * 24 * 60 * 60 * 1000;
        case "w":
            return value * 7 * 24 * 60 * 60 * 1000;
        case "M":
            return value * 30 * 24 * 60 * 60 * 1000;
        case "y":
            return value * 365 * 24 * 60 * 60 * 1000;
        default:
            throw new Error(`Unhandled time unit key: ${key}`);
    }
};

export const formatDateToString = (originalDate: string) => {

    if (!originalDate) return '';

    const date = new Date(originalDate);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;

    return formattedDate;
};
