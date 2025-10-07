import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "./models/userModel.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Sample user data with enhanced profiles
const sampleUsers = [
  {
    name: "Sarah Johnson",
    email: "user2@gmail.com",
    bloodGroup: "A+",
    age: 28,
    height: "165 cm",
    weight: "58 kg",
    gender: "Female",
    dob: "1996-03-15",
    phone: "555-0102",
    address: { line1: "123 Oak Street", line2: "Downtown, NY 10001" },
    medicalHistory: "Appendectomy in 2018, No major complications",
    allergies: "Peanuts, Shellfish",
    currentMedications: "Vitamin D supplement",
    emergencyContact: {
      name: "Michael Johnson",
      phone: "555-0103",
      relationship: "Spouse"
    },
    occupation: "Software Engineer",
    maritalStatus: "Married",
    smokingStatus: "Never",
    drinkingStatus: "Occasionally",
    exerciseFrequency: "Regularly",
    chronicConditions: ""
  },
  {
    name: "David Chen",
    email: "user3@gmail.com",
    bloodGroup: "O-",
    age: 35,
    height: "178 cm",
    weight: "75 kg",
    gender: "Male",
    dob: "1989-07-22",
    phone: "555-0104",
    address: { line1: "456 Pine Avenue", line2: "Uptown, CA 90210" },
    medicalHistory: "Broken leg in 2015, Fully recovered",
    allergies: "Penicillin",
    currentMedications: "Blood pressure medication (Lisinopril 10mg)",
    emergencyContact: {
      name: "Lisa Chen",
      phone: "555-0105",
      relationship: "Spouse"
    },
    occupation: "Marketing Manager",
    maritalStatus: "Married",
    smokingStatus: "Former",
    drinkingStatus: "Regularly",
    exerciseFrequency: "Sometimes",
    chronicConditions: "Mild hypertension"
  },
  {
    name: "Emily Rodriguez",
    email: "user4@gmail.com",
    bloodGroup: "AB+",
    age: 31,
    height: "160 cm",
    weight: "52 kg",
    gender: "Female",
    dob: "1993-11-08",
    phone: "555-0106",
    address: { line1: "789 Maple Drive", line2: "Suburb, TX 75001" },
    medicalHistory: "Cesarean delivery in 2020, Thyroid surgery in 2019",
    allergies: "Latex, Aspirin",
    currentMedications: "Levothyroxine 50mcg, Prenatal vitamins",
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "555-0107",
      relationship: "Spouse"
    },
    occupation: "Nurse Practitioner",
    maritalStatus: "Married",
    smokingStatus: "Never",
    drinkingStatus: "Never",
    exerciseFrequency: "Regularly",
    chronicConditions: "Hypothyroidism"
  },
  {
    name: "James Wilson",
    email: "user5@gmail.com",
    bloodGroup: "A-",
    age: 42,
    height: "183 cm",
    weight: "82 kg",
    gender: "Male",
    dob: "1982-01-30",
    phone: "555-0108",
    address: { line1: "321 Cedar Lane", line2: "Midtown, FL 33101" },
    medicalHistory: "Knee surgery in 2021, Gallbladder removal in 2018",
    allergies: "Sulfa drugs",
    currentMedications: "Ibuprofen as needed, Multivitamin",
    emergencyContact: {
      name: "Jennifer Wilson",
      phone: "555-0109",
      relationship: "Spouse"
    },
    occupation: "Construction Manager",
    maritalStatus: "Married",
    smokingStatus: "Former",
    drinkingStatus: "Occasionally",
    exerciseFrequency: "Sometimes",
    chronicConditions: "Osteoarthritis in left knee"
  },
  {
    name: "Maria Garcia",
    email: "user6@gmail.com",
    bloodGroup: "B-",
    age: 26,
    height: "157 cm",
    weight: "49 kg",
    gender: "Female",
    dob: "1998-09-12",
    phone: "555-0110",
    address: { line1: "654 Birch Court", line2: "Eastside, AZ 85001" },
    medicalHistory: "Wisdom teeth removal in 2020",
    allergies: "None reported",
    currentMedications: "Birth control pill",
    emergencyContact: {
      name: "Rosa Garcia",
      phone: "555-0111",
      relationship: "Mother"
    },
    occupation: "Graphic Designer",
    maritalStatus: "Single",
    smokingStatus: "Never",
    drinkingStatus: "Occasionally",
    exerciseFrequency: "Daily",
    chronicConditions: ""
  },
  {
    name: "Robert Taylor",
    email: "user7@gmail.com",
    bloodGroup: "O+",
    age: 39,
    height: "175 cm",
    weight: "78 kg",
    gender: "Male",
    dob: "1985-04-18",
    phone: "555-0112",
    address: { line1: "987 Elm Street", line2: "Westside, WA 98101" },
    medicalHistory: "Heart surgery in 2019 (stent placement), No complications",
    allergies: "Codeine",
    currentMedications: "Atorvastatin 20mg, Aspirin 81mg",
    emergencyContact: {
      name: "Susan Taylor",
      phone: "555-0113",
      relationship: "Spouse"
    },
    occupation: "Financial Advisor",
    maritalStatus: "Married",
    smokingStatus: "Former",
    drinkingStatus: "Never",
    exerciseFrequency: "Regularly",
    chronicConditions: "Coronary artery disease, High cholesterol"
  },
  {
    name: "Lisa Anderson",
    email: "user8@gmail.com",
    bloodGroup: "AB-",
    age: 33,
    height: "168 cm",
    weight: "61 kg",
    gender: "Female",
    dob: "1991-12-05",
    phone: "555-0114",
    address: { line1: "147 Spruce Avenue", line2: "Northside, OR 97201" },
    medicalHistory: "Laparoscopic surgery in 2017 (endometriosis)",
    allergies: "Iodine, Shellfish",
    currentMedications: "Hormonal therapy, Iron supplement",
    emergencyContact: {
      name: "Mark Anderson",
      phone: "555-0115",
      relationship: "Spouse"
    },
    occupation: "Physical Therapist",
    maritalStatus: "Married",
    smokingStatus: "Never",
    drinkingStatus: "Occasionally",
    exerciseFrequency: "Daily",
    chronicConditions: "Endometriosis"
  },
  {
    name: "Kevin Brown",
    email: "user9@gmail.com",
    bloodGroup: "B+",
    age: 29,
    height: "180 cm",
    weight: "73 kg",
    gender: "Male",
    dob: "1995-08-25",
    phone: "555-0116",
    address: { line1: "258 Walnut Road", line2: "Southside, CO 80201" },
    medicalHistory: "Sports injury in 2020 (torn ACL), Full recovery",
    allergies: "None reported",
    currentMedications: "Protein supplements",
    emergencyContact: {
      name: "Patricia Brown",
      phone: "555-0117",
      relationship: "Mother"
    },
    occupation: "Personal Trainer",
    maritalStatus: "Single",
    smokingStatus: "Never",
    drinkingStatus: "Occasionally",
    exerciseFrequency: "Daily",
    chronicConditions: ""
  },
  {
    name: "Amanda Davis",
    email: "user10@gmail.com",
    bloodGroup: "A+",
    age: 37,
    height: "162 cm",
    weight: "55 kg",
    gender: "Female",
    dob: "1987-02-14",
    phone: "555-0118",
    address: { line1: "369 Poplar Street", line2: "Central, NV 89101" },
    medicalHistory: "Breast cancer survivor (2020), In remission",
    allergies: "Morphine, Latex",
    currentMedications: "Tamoxifen, Calcium supplement",
    emergencyContact: {
      name: "John Davis",
      phone: "555-0119",
      relationship: "Spouse"
    },
    occupation: "Teacher",
    maritalStatus: "Married",
    smokingStatus: "Never",
    drinkingStatus: "Never",
    exerciseFrequency: "Regularly",
    chronicConditions: "Cancer survivor - regular monitoring"
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.log("❌ Database connection failed:", error);
    process.exit(1);
  }
};

const addSampleUsers = async () => {
  try {
    await connectDB();
    
    console.log("🔄 Adding sample users...");
    
    // Hash password for all users
    const hashedPassword = await bcrypt.hash("user@123", 10);
    
    for (let i = 0; i < sampleUsers.length; i++) {
      const userData = {
        ...sampleUsers[i],
        password: hashedPassword,
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA5uSURBVHgB7d0JchvHFcbxN+C+iaQolmzFsaWqHMA5QXID+wZJTmDnBLZu4BvER4hvYJ/AvoHlimPZRUngvoAg4PkwGJOiuGCd6df9/1UhoJZYJIBvXndPL5ndofljd8NW7bP8y79bZk+tmz8ATFdmu3nWfuiYfdNo2383389e3P5Xb9B82X1qs/YfU3AB1Cuzr+3cnt8U5Mb132i+7n5mc/a9EV4gDF37Z15Qv3/9a/fz63/0VgXOw/uFdexLAxCqLze3s+flL/4IcK/yduwrAxC0zoX9e+u9rJfVXoB7fV41m7u2YQBCt2tt+6v6xEUfeM6+ILyAGxv9QWbL+iPOPxoAX2Zts9GZtU8NgDudln3eyNvQnxgAd/Lw/k194I8NgD+ZPc2aO92uAXCpYQDcIsCAYwQYcIwAA44RYMAxAgw4RoABxwgw4BgBBhwjwIBjBBhwjAADjhFgwDECDDhGgAHHCDDgGAEGHCPAgGMEGHCMAAOOEWDAMQIMOEaAAccIMOAYAQYcI8CAYwQYcIwAA44RYMAxAgw4RoABxwgw4BgBBhwjwIBjBBhwjAADjhFgwDECDDhGgAHHCDDgGAEGHCPAgGOzBlfanfzRNrvo5o8Ls46eO8VDut3i966babz7rMfcjFmWP8/rOTM4Q4ADpjCenZu18sCe52FtX9wczkGUAS+fb6IwK9Tzc/kHI/96gU9H8HiLAnOWh/WsZXZ6fnfYpkEXCT30b0sjr8jz+SdkYb4I8wwdruAQ4AAotCdnRbUdtcJOg74XhbkMtCr08iJhDgkBrkmv0uWV9vgsrNDeRd/z3lHxtSrz0kIe6HlDjQhwxVRtD0+Kfq1n+v5b/Z9lKQ/x8gJVuQ5Zc6fr5PrvWyzBvYuCvLZEkKtEBZ6yFIJbOmkVD4JcHQI8JSkF9zqFWANyalYryJgeAjxh6pAc5ME9OrOkaWDu8LQI8+oSg13TQoAnSKPKe8d+RpWroHvZGrlundOsngYCPAGqurtHl/dL8S5VYnUnqMaTRYDHpL6uKkzVs6Y8Kqux5nKrGjP3enwEeAwHp8VAFYaj8QG1VrbWaFKPi5dvBGoyvz4gvONQNX61X4wbYHQEeEj64O3sp3l7aNI02Nc8KkbtMRqa0EPQXODmIf3dSdPtJrVqHiwbhkQFHpDC++aA8E6L+sW7R4YhUYEHcNy6XIWD6dGtJm1aoMEtRqgHQwW+B+Gtllo6GiBkic1gCPAdrq5/RXX0utOcHgwBvkXZ50U9dJ+YEN+PAN9AA1UabWZOc73UJ+YW090I8DXlJA1Gm8OgW0xHp4ZbEOBrdpnXHJz9RNdVD4IAX6G5zawoChMX1psR4L5yBw2ESeFlUOtdBNgul7khbGpG0x9+GwG2YqST5pkP6g9rthYKyQdYG6ufsKTNFZrSl5IOsKruIU0ydzTJhvvDhaQDTNPZL7WceO8SDrDefJrOfnW6NKUl2eWEmioZi0b/TN/FhfwN7Z8c2Ji5/PPz/qmHZ6f9s4Yjudddns80n/Ci2CR/dDW/zp2PZCq0G+tmaytFcBtDtKUU4OO8+7C3n9+Wcd6XVDdI64dTlWSAPQ9cKahbm2YPN4YL7VVzebVe1+NBEeadN0WYPUq9Cid3OqGqr05P8OhhHtzth6MH9y4KsILssXmt8KZahZMbxPJafR9v549H0wmvqBp/9KeiOntTVuEUJRVgzXf2eOtB4VWTedoU3mcf+gxxqveFkwqwx8UKj7aqCW9JI9iqxA1nn4xUq3AyAVbl9fYGqxKqz1vHv/vkPXMnxYUOyQTYYxPryWOrjW5PrTg7nFsX6NR2s0wmwN6q7/JS8aiTmu+eaLLKcWIHqycRYI+DVxsPrHa6gHjrC6e2o0oSAT5xeFVeDuScoBAuJMNoOb3TMKo0KrCzq/LCQj6QFMjMolAuJMNI6cjS6AOs5rO3/Z1Dmha4OG/upNSMjj/ADq/GqsCh0C0lj/eEUxmNjj7AHm/uhzYTambG3EllrXfUAdZghsdlgzNsNTi2VDa+i/qjcs5u/hPhcaleKtMqow6w1zcxtNsgHl9HtbxS6AfHXYGdNqM6gX3fF05fR++7rgwi6gB77QeF1PRXa6DjdGJECl2oaAOsq6/X831D2hXjzPHcYiqwY54P5z4OaOXUqeMleimMREcbYM9vnpqtoYT40PHeyynMiY42wF4HXkpHAWy8p6a8521n1QqLfSQ63gA7v/o2d6123veMFs9dqUHQBw5U70DrmvdqfvXG3Iu9GR1tgGNoOtUZIF08YjiCJfaBLCpwwBSgN02rnO77xlB9U0AFDpyCVPWEhJ3X8RyAxiCWU7EMXqgP9/Mv1c2GUsV/E8AA2qQwiIXanZ6Z/bpjU6d/57dXBkcSPlnVl/L0wGntFa2JI//7xeAMAXZEIdbc5A+eTHbTOzWbqbw+0YR2Rs1cn36ezD1iDVTpv0V4/Yq2Amtbmlhv4it4L38rRqgfPRx+72YNiL3uD1Z5XSo4qNi3J6IJ7djVIOsUhbXVYvub67taKqT6u4fHxeKEkFY7YTzRBriR5RXY0qBw7p1fDnRJubOlFnXEXmXvMutwR81hRN2ETmFB921imYiBu0XbQ8gyA6LvA0f847G3MoQAO0WAMRd5/1ei/ZiHcrof6pNCNyrqQayUXD1P6aaTFMrN2VMalU6hAkd9GymmyRwKqI76nMsfC/PFgWOLC8XPOMrpgVqiqJHq3vlRrWLE/uw0jm10SguBHRI3DVE3NFWJvJ5Sp8BqYoYmaKwsTf6IT3Ux/uhmrLz9Z5queXxcTPg4cLwrZQqtsKgDPOcswArp1qbZ+oN6+/Cq7Ho83Cx+rRDv7fkKs1pgsU/ikOgrsAeqsttbxXOI1laKR2+LHwX5MPyJIimEV+KuwDPFlTjUXRlU5R5vhxvc69Ssf/wor8zrRZDr2K9rUIsJ9H8l+pstuhKHeDymKq5WEnl0Ncg//T/MapzCAJZE383XyG1I9OF/9qHf8F6ln+UvTy/7yqHQ4FUqTejoA7wUUID1gf/og6LpHBNVY7UoQuFl7GMSog+w+sAhvKFleGOdIaYWRSghDumiPW1JzFeaD6A/FHN4Swrx+pC7g0yams+p9H8liQCv1NxkfbSVztxsjarP1RiglJrPkkSA62xG68O8HcGA1aBUAev8eZcjG1+4TzJT/lcWrRYphbfUm0lWQxXWxYMKHCm9sY2Kl5fpA1V3n7AuG2tWuTUnE2ImKZkAK7zLFVdhLzOspqHqC1eK1VeSWjWrwawqq3DKAVYTulHhp0vhTXEXlqR+5KqrcOynw9+l6k0DUmw+S3LXrCqrsDZc11m7qSmPbKkqxJq4keoeaMn1GsoqfFjRzhMKsdbR/vlJ/PeC6zqyJdXqK1lzJ/YzzN+l5YU7e9UvM1SfWIM7G5GNTNd51pJaVA+WLVlJBlgOTqurwtdpgKc8y2ga2+VUQcec7h8W2+7UddaSms1ba2lvIZxsgFV9X+2HMdCk1Uk6kEyb1S0tFr8OKdTaAE/7ZLVaZicnxcZ3IexsubGS1sKFmyS7e7L6wvoAvD6w2ikcelylACvIWogxO1v8er4/WNPbiXJm/D61QqgLWOeieG6dF9vOti/6O1W2i98LcRtavQaph1eS3v5c9w619cppgDtKKDTDNE8HnboYy77QWzXM9ApR8ucXrOdVuFXDgNakpXQa4doiR+eUkn8Z1JReXzE4oeCuJnzb6DquY1Y0o+teM4z76WJL0/ltBLhPV3WaZWHjPXoXL0dfeXWveskhBqMWEq2kdxHgK3R1T3lWT6i0QT/vy80I8DW6t5jy3NrQ6KK6uWq4BQG+weoizbUQlN0a+r2346W5hZpszPSpj8L7kPDei5fnDppqmcIp7yFa57UfCAG+h6oAH6Rq6cKZyumC4yLA9yibcnygpk+vtQas6LoMjgAPgA/W9HGhHA0BHoKadtximjwNVD16QFdlFMmvRhqWbjFlebXYPzZMgEKr1g2jzaMhwCPQPWKtJW4epr117Lj0OqpFkzF9dWRc90akyqFJBimeBjAu9Xd1n10PwjseAjyGclM1+sWD04VP/V1muk0G9WMC1C/WCLX616JJfTtd6FZrOiUyVsnuSjkth6dmBzVtsxoqdTPUXGaUefKowBNWVmOF+KRlSVNfV4vwaS5PDwGeAvWNe9MB54vbTak1qxXclf6KLgapposAT5FmFS2uF5VYFTn2IBPc6hHgCqhJrYeCfKwTDtoWFYJbHwJcoTLICrCC7L2PrEEpdRMIbn0IcA00KquHbquUYfZSlVVtdRFScJnEUj/eghqV5/voof6xjng5bYUX5quhVdWl2oaD+8AB0jty1i7C3Dto7MIqpcD2WglzRWCptOHirQmQKlxvBLu/NlaBPu8HuXdaYLcI9iTOc1IrQCEtnxVaVgb5QQV2TO9cu1M8K8xdHRVqN58+ONsPZVYeT5oR1BhQgR1TpWZ6Ytq4BgOOEWDAMQIMOEaAAccIMOAYAQYcI8CAYwQYcIwAA44RYMAxAgw4RoABxwgw4BgBBhwjwIBjBBhwjAADjhFgwDECDDhGgAHHCDDgGAEGHCPAgGMEGHCMAAOOEWDAMQIMOEaAAccIMOAYAQYcI8CAYwQYcIwAA44RYMAxAgw4RoABxwgw4BgBBhwjwIBjBBhwjAADjhFgwDECDDjWsMxeGACPdhvWJcCAUz80OmbfGQB3Ohf2TdZsdjesbU0D4EvbnjU2N7Pd/MtvDYAfmX29+X72ohiFbtu/8v/dNQAe7Nq5PdcXvQAryfnTcwPgwfN+Zi/vA29uZ18ZIQbC1snDW2S1J7v+582d7uf50xf5Y8MAhEJd3LfCK9lNf7P5svu0M2NfNjL7hwGo27capyqbzVdld/2/FGSbtU/zLz/JHx8bVRmYPs2OLCZYfWeH9tXms+zWAebfASz7TK2tFnyYAAAAAElFTkSuQmCC'
      };
      
      // Check if user already exists
      const existingUser = await userModel.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`⚠️  User ${userData.email} already exists, skipping...`);
        continue;
      }
      
      // Create new user
      const newUser = new userModel(userData);
      await newUser.save();
      
      console.log(`✅ Added user: ${userData.name} (${userData.email}) - Blood Group: ${userData.bloodGroup}`);
    }
    
    console.log("\n🎉 Successfully added all sample users!");
    console.log("📋 Summary of added users:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    sampleUsers.forEach((user, index) => {
      console.log(`${index + 2}. ${user.name} - ${user.email} - Blood: ${user.bloodGroup} - Age: ${user.age}`);
    });
    
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("💡 All users have password: user@123");
    console.log("🩺 Users have complete health profiles with diverse medical data");
    
    // Get total user count
    const totalUsers = await userModel.countDocuments();
    console.log(`📊 Total users in database: ${totalUsers}`);
    
    mongoose.disconnect();
    console.log("🔌 Database connection closed");
    
  } catch (error) {
    console.error("❌ Error adding sample users:", error);
    mongoose.disconnect();
    process.exit(1);
  }
};

// Run the script
addSampleUsers();