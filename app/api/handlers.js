export const getAnAccount = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/api/accounts/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    const account = await res.json();
    return account;
  } catch (error) {
    return error;
  }
};

export const GetUserCart = async (_id) => {
  try {
    const res = await fetch(`http://localhost:3001/api/users/${_id}/cart`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const cart = await res.json();
    return cart;
  } catch (error) {
    return error;
  }
};

export const PutToCart = async (account, user) => {
  try {
    const res = await fetch(`http://localhost:3001/api/users/${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account }),
    });
    const newCart = await res.json();
    return newCart;
  } catch (error) {
    return error;
  }
};

export const kickToCart = async (account, _id2) => {
  try {
    const res = await fetch(
      `http://localhost:3001/api/users/${account._id}/${_id2}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const newCart = await res.json();
    return newCart;
  } catch (error) {
    return error;
  }
};

export const getAllAccounts = async (pastContent, maxPrice) => {
  try {
    let url = "http://localhost:3001/api/accounts";
    if (pastContent !== null && maxPrice !== null) {
      url += `?pastContent=${pastContent}`;
      url += `&maxPrice=${maxPrice}`
    }
    else if (pastContent == null && maxPrice !== null) {
      url += `?maxPrice=${maxPrice}`
    }
    else if (pastContent !== null && maxPrice == null) {
      url += `?pastContent=${pastContent}`;
    }
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const accounts = await res.json();
    return accounts;
  } catch (error) {
    return error;
  }
};
