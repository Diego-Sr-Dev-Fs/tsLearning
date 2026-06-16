// Types of TypeScript destructuring examples

/******* Destructuring ********/

interface UserData {
  name: string;
  age: number;
  email: string;
}

interface UserResult {
  greeting: string;
  yearOfBirth: number;
  contact: string;
}

// Destructuring in function parameters: object destructuring
// Aquí la función recibe un objeto `UserData` y extrae directamente sus campos
// `name`, `age` y `email` para usar dentro de la función.
function createUser({ name, age, email }: UserData): UserResult {
  const currentYear = new Date().getFullYear();
  const greeting = `Hola ${name}`;
  const yearOfBirth = currentYear - age;
  const contact = `Email enviado a ${email}`;

  return {
    greeting,
    yearOfBirth,
    contact,
  };
}

const userInput: UserData = {
  name: 'Diego',
  age: 28,
  email: 'diego@example.com',
};

const userResponse = createUser(userInput);

// Destructuring assignment: extraer valores de un objeto devuelto
// Aquí obtenemos `greeting`, `yearOfBirth` y `contact` del resultado.
const { greeting, yearOfBirth, contact } = userResponse;
console.log('Respuesta de createUser:', { greeting, yearOfBirth, contact });

interface ProductTuple {
  0: string;
  1: number;
  2: boolean;
  length: 3;
}

type ProductData = [string, number, boolean];

// Destructuring in function parameters: array/tuple destructuring
// Aquí la función recibe un array de tipo `ProductData` y extrae cada elemento
// en variables `name`, `price` e `inStock`.
function parseProduct([name, price, inStock]: ProductData): { description: string; priceWithTax: number; availability: string } {
  const priceWithTax = Number((price * 1.19).toFixed(2));
  const availability = inStock ? 'Disponible' : 'Agotado';

  return {
    description: `${name} - ${availability}`,
    priceWithTax,
    availability,
  };
}

const productInput: ProductData = ['Camiseta', 25.5, true];
const productResult = parseProduct(productInput);

// Destructuring assignment again: tomar propiedades específicas de la respuesta
const { description, priceWithTax, availability } = productResult;
console.log('Respuesta de parseProduct:', { description, priceWithTax, availability });
