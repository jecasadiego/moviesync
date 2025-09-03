// enable CORS - Cross Origin Resource Sharing
const corsOptions = {
  origin: [
    "http://localhost:5000", 
    "http://localhost:4200", 
    "http://127.0.0.1:5500",
    "https://gray-sea-0b4af430f.5.azurestaticapps.net",
    "https://salmon-wave-062d72a0f.4.azurestaticapps.net",
    "https://thankful-pebble-0ebe60d0f.6.azurestaticapps.net",
    "https://idbforms-dev.sinapsisdev.com",
    "https://idbforms-test.sinapsisdev.com",
    "https://idbforms-edu-dev.sinapsisdev.com",
    "https://zealous-hill-0f3dfcc0f.6.azurestaticapps.net",
    "https://idbforms-edutec-dev.sinapsisdev.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
};
const ipsAllowlist = ["190.250.135.141","72.14.201.211","181.130.216.212","181.61.245.60","190.250.21.64","191.91.198.100"]

export { corsOptions, ipsAllowlist };
