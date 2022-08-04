export const restaurantsRequest = (Name) => {

    const mockData = [
        { Name: "Wrapchik" },
        { Name: "Sip n Bites" },
        { Name: "Pizza Nation" },
        { Name: "G Cafeteria" },
        { Name: "A Cafeteria" },
        { Name: "Dessert Club" }
    ]

    if (Name === "All") {
        return new Promise((resolve, reject) => {
            const mock = [{ Name: "Wrapchik" },
            { Name: "Sip n Bites" },
            { Name: "Pizza Nation" },
            { Name: "G Cafeteria" },
            { Name: "A Cafeteria" },
            { Name: "Dessert Club" }]
            if (!mock) {
                reject("Not found");
            }
            resolve(mock);
        })
    }
    else {
        return new Promise((resolve, reject) => {
            const mock = { Name }
            if (!mock) {
                reject("Not found");
            }
            resolve([mock]);
        });
    }
}