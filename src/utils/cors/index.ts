// enable CORS - Cross Origin Resource Sharing
const corsOptions = {
  origin: [
    "http://localhost:5000", 
    "http://localhost:4200", 
    "http://127.0.0.1:5500",
    "https://moviesync-je.netlify.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
};
const ipsAllowlist = ["190.250.135.141","72.14.201.211","181.130.216.212","181.61.245.60","190.250.21.64","191.91.198.100"]

export { corsOptions, ipsAllowlist };
