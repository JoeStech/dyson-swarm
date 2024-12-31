FROM public.ecr.aws/lambda/python:3.12

COPY requirements.txt .
RUN pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

COPY app_handler.py ${LAMBDA_TASK_ROOT}
COPY app_files/ ${LAMBDA_TASK_ROOT}/app_files

CMD [ "app_handler.handler" ]