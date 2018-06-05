FROM ubuntu:14.04

ENV DEBIAN_FRONTEND nonintereactive

RUN apt-get update -y
RUN apt-get install -y curl
RUN apt-get install -y lsof
RUN apt-get install -y openssh-client

RUN echo "source /root/bash_extra" >> /root/.bashrc

ADD bash_extra /root/.bashrc

CMD ["/bin/bash"]
