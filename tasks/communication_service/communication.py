from abc import ABC, abstractmethod

class Communication(ABC):
	def publish(self):
		pass

	def subscribe(self):
		pass
