build-all:
	$(MAKE) -C ./backend build
	$(MAKE) -C ./frontend build

rm-all:
	$(MAKE) -C ./backend rm
	$(MAKE) -C ./frontend rm

stop-all:
	$(MAKE) -C ./backend stop
	$(MAKE) -C ./frontend stop

start-all:
	$(MAKE) -C ./backend start
	$(MAKE) -C ./frontend start