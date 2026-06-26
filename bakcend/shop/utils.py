from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile


def convert_to_webp(image, width=800, quality=70):
    img = Image.open(image)

    # PNG transparency support
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    # Resize
    img.thumbnail((width, width))

    output = BytesIO()

    img.save(
        output,
        format="WEBP",
        quality=quality,
        optimize=True
    )

    output.seek(0)

    return ContentFile(
        output.read(),
        name=image.name.rsplit(".", 1)[0] + ".webp"
    )