FROM python:3.10-bullseye

ENV PATH="/env/bin:${PATH}"
WORKDIR /app
COPY requirements.txt /app/
RUN python -m venv /env && \
    pip install -r requirements.txt
COPY . /app/
USER nobody
EXPOSE 8080
CMD ["gunicorn", "app:app"]
