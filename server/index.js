import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Configura el cliente de Mercado Pago
const client = new MercadoPagoConfig({
    accessToken: "YOUR_ACCESS_TOKEN", // Reemplaza con tu accessToken real
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server : ");
});

app.post("/create_preference", async (req, res) => {
    try {
        // Define los items a partir del cuerpo de la solicitud
        const items = req.body.items.map((item) => ({
            title: item.title,
            quantity: Number(item.quantity),
            unit_price: Number(item.unit_price),
            currency_id: "ARS",
        }));

        const preferenceData = {
            items,
            back_urls: {
                success: "http://www.your-site.com/success",
                failure: "http://www.your-site.com/failure",
                pending: "http://www.your-site.com/pending",
            },
            auto_return: "approved",
        };

        // Crea la preferencia
        const preferenceInstance = new Preference(client);
        const result = await preferenceInstance.create({ body: preferenceData });

        // Devuelve el ID de la preferencia
        res.json({
            id: result.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al crear la preferencia",
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
