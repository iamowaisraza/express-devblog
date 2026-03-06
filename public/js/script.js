const successToast = document.getElementById("toast-success");
const failureToast = document.getElementById("toast-failure");

function showToast(element) {
  element.style.display = "flex";

  setTimeout(() => {
    element.style.display = "none";
    window.history.replaceState({}, document.title, "/");
  }, 2000);
}

function handleQueryParams() {
  const params = new URLSearchParams(window.location.search);

  if (params.get("success")) {
    showToast(successToast);
  }

  if (params.get("failure")) {
    showToast(failureToast);
  }
}

async function confirmDelete(id) {
  const isConfirmed = confirm("Are you sure you want to delete this post?");
  if (!isConfirmed) return;

  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Post Deleted Successfully🥳");
      window.location.href = "/";
    } else {
      alert("Failed to delete post☹️");
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete post☹️");
  }
}

async function updatePost(id) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title,
        author,
        content,
      }),
    });

    if (response.ok) {
      alert("Post Updated Successfully🥳");
      window.location.href = "/";
    } else {
      alert("Failed to update post☹️");
    }
  } catch (error) {
    console.error("Update error:", error);
    alert("Failed to update post☹️");
  }
}

handleQueryParams();
