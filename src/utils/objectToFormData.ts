export function objectToFormData(obj: object): FormData{
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return formData as FormData;
}
