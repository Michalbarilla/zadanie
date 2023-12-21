const apiUrl = "http://api.programator.sk";

export function getImageUrl(image, width = 304, height = 228) {
  try {
    return `${apiUrl}/images/${width}x${height}/${image.fullpath}`;
  } catch {
    return "no-image-found.png";
  }
}

export async function getImages(category) {
  try {
    const response = await fetch(`${apiUrl}/gallery/${category}`);
    const data = await response.json();
    return data.images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export async function deleteRequest(objectToDelete) {
  await fetch(`${apiUrl}/gallery/${objectToDelete}`, {
    method: "DELETE",
  });
}
export async function uploadImage(category, formData) {
  try {
    const response = await fetch(`${apiUrl}/gallery/${category}`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response;
  } catch (error) {
    throw error;
  }
}

export async function fetchGalleries() {
  const response = await fetch(`${apiUrl}/gallery`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function fetchImageCount(category) {
  const response = await fetch(`${apiUrl}/gallery/${category}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function addCategory(categoryName) {
  const response = await fetch(`${apiUrl}/gallery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: categoryName }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
