FROM oven/bun:1.0.6 as base

ENV PLENTY_PLANTS_HOME=/opt/plenty_plants

RUN mkdir -p $PLENTY_PLANTS_HOME
WORKDIR $PLENTY_PLANTS_HOME

COPY package.json bun.lockb $PLENTY_PLANTS_HOME/

FROM base as plenty_plants

RUN bun install --production
COPY src $PLENTY_PLANTS_HOME/src

FROM plenty_plants as plenty_plants_test

RUN bun install
COPY tests $PLENTY_PLANTS_HOME/tests
